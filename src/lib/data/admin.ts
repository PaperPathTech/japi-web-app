import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export type VendorStatus =
  | "draft"
  | "under_review"
  | "active"
  | "paused"
  | "suspended";

type VendorProfileRow = {
  id: string;
  business_name: string | null;
  category: string | null;
  city: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  instagram: string | null;
  status: VendorStatus | null;
  description: string | null;
  cover_image_url: string | null;
  updated_at: string | null;
};

type VendorReportRow = {
  id: string;
  vendor_id: string;
  reason: string;
  details: string | null;
  created_at: string | null;
  reporter_user_id: string;
};

type VendorServiceRow = {
  id: string;
  user_id: string;
  title: string;
  category: string;
  price_from: string;
  short_description: string;
  is_package: boolean;
  created_at: string | null;
};

export type AdminVendorListItem = {
  id: string;
  businessName: string;
  category: string;
  city: string;
  status: VendorStatus;
  updatedAt: string | null;
};

export type AdminPagination = {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
};

export type AdminPaginatedResult<T> = {
  items: T[];
  pagination: AdminPagination;
};

export type AdminVendorReportListItem = {
  id: string;
  vendorId: string | null;
  vendorName: string;
  reason: string;
  details: string;
  reportedAt: string | null;
  reporterId: string | null;
};

export type AdminVendorDetail = {
  profile: {
    id: string;
    businessName: string;
    category: string;
    city: string;
    email: string;
    phone: string;
    website: string;
    instagram: string;
    status: VendorStatus;
    description: string;
    coverImageUrl: string;
    updatedAt: string | null;
  };
  services: {
    id: string;
    title: string;
    summary: string;
    category: string;
    priceFrom: string;
    isPackage: boolean;
  }[];
  reports: {
    id: string;
    reason: string;
    details: string;
    reporterId: string | null;
    createdAt: string | null;
  }[];
};

export type AdminDashboardSummary = {
  vendorCounts: {
    draft: number;
    underReview: number;
    active: number;
    paused: number;
    suspended: number;
    total: number;
  };
  reportCount: number;
  recentReports: {
    id: string;
    vendorId: string | null;
    vendorName: string;
    reason: string;
    details: string;
    reportedAt: string | null;
  }[];
};

function normalizeVendorStatus(
  status: VendorStatus | null | undefined
): VendorStatus {
  return status ?? "draft";
}

export async function getAdminVendorList(
  query?: string,
  status?: VendorStatus | "all",
  page: number = 1,
  pageSize: number = 20
): Promise<AdminPaginatedResult<AdminVendorListItem>> {
  const supabase = createAdminSupabaseClient();

  const normalizedQuery = query?.trim();
  const normalizedStatus = status?.trim?.() as VendorStatus | "all" | undefined;
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safePageSize =
    Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : 20;

  const buildRequest = () => {
    let request = supabase
      .from("vendor_profiles")
      .select("id,business_name,category,city,status,updated_at", {
        count: "exact",
      })
      .order("updated_at", { ascending: false });

    if (normalizedStatus && normalizedStatus !== "all") {
      request = request.eq("status", normalizedStatus);
    }

    if (normalizedQuery) {
      const ilike = `%${normalizedQuery}%`;
      request = request.or(
        `business_name.ilike.${ilike},category.ilike.${ilike},city.ilike.${ilike}`
      );
    }

    return request;
  };

  const from = (safePage - 1) * safePageSize;
  const to = from + safePageSize - 1;
  let { data, error, count } = await buildRequest().range(from, to);

  if (error) {
    throw new Error(`Failed to load vendor profiles: ${error.message}`);
  }

  const total = count ?? 0;
  const totalPages = total === 0 ? 1 : Math.ceil(total / safePageSize);
  let currentPage = total === 0 ? 1 : safePage;

  if (total > 0 && safePage > totalPages) {
    currentPage = totalPages;
    const lastFrom = (currentPage - 1) * safePageSize;
    const lastTo = lastFrom + safePageSize - 1;
    const { data: lastData, error: lastError } = await buildRequest().range(
      lastFrom,
      lastTo
    );

    if (lastError) {
      throw new Error(`Failed to load vendor profiles: ${lastError.message}`);
    }

    data = lastData ?? [];
  }

  const items = ((data ?? []) as Pick<
    VendorProfileRow,
    "id" | "business_name" | "category" | "city" | "status" | "updated_at"
  >[]).map((vendor) => ({
    id: vendor.id,
    businessName: vendor.business_name ?? "Untitled Vendor",
    category: vendor.category ?? "Unassigned",
    city: vendor.city ?? "-",
    status: normalizeVendorStatus(vendor.status),
    updatedAt: vendor.updated_at ?? null,
  }));

  return {
    items,
    pagination: {
      page: currentPage,
      pageSize: safePageSize,
      total,
      totalPages,
    },
  };
}

export async function getAdminVendorReports(
  query?: string,
  link?: "all" | "linked" | "orphaned",
  page: number = 1,
  pageSize: number = 20
): Promise<AdminPaginatedResult<AdminVendorReportListItem>> {
  const supabase = createAdminSupabaseClient();

  const normalizedQuery = query?.trim();
  const normalizedLink = link?.trim?.() as
    | "all"
    | "linked"
    | "orphaned"
    | undefined;
  const safePage = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
  const safePageSize =
    Number.isFinite(pageSize) && pageSize > 0 ? Math.floor(pageSize) : 20;

  const buildRequest = () => {
    let request = supabase
      .from("vendor_reports")
      .select(
        `
      id,
      vendor_id,
      reason,
      details,
      created_at,
      reporter_user_id,
      vendor_profiles:vendor_id (
        business_name
      )
    `,
        { count: "exact" }
      )
      .order("created_at", { ascending: false });

    if (normalizedLink === "linked") {
      request = request.not("vendor_id", "is", null);
    }

    if (normalizedLink === "orphaned") {
      request = request.is("vendor_id", null);
    }

    if (normalizedQuery) {
      const ilike = `%${normalizedQuery}%`;
      request = request.or(
        `reason.ilike.${ilike},details.ilike.${ilike},reporter_user_id.ilike.${ilike},vendor_profiles.business_name.ilike.${ilike}`
      );
    }

    return request;
  };

  const from = (safePage - 1) * safePageSize;
  const to = from + safePageSize - 1;
  let { data, error, count } = await buildRequest().range(from, to);

  if (error) {
    throw new Error(`Failed to load vendor reports: ${error.message}`);
  }

  const total = count ?? 0;
  const totalPages = total === 0 ? 1 : Math.ceil(total / safePageSize);
  let currentPage = total === 0 ? 1 : safePage;

  if (total > 0 && safePage > totalPages) {
    currentPage = totalPages;
    const lastFrom = (currentPage - 1) * safePageSize;
    const lastTo = lastFrom + safePageSize - 1;
    const { data: lastData, error: lastError } = await buildRequest().range(
      lastFrom,
      lastTo
    );

    if (lastError) {
      throw new Error(`Failed to load vendor reports: ${lastError.message}`);
    }

    data = lastData ?? [];
  }

  const mapped = ((data ?? []) as (VendorReportRow & {
    vendor_profiles?:
      | { business_name?: string | null }
      | { business_name?: string | null }[]
      | null;
  })[]).map((report) => {
    const vendorProfile = Array.isArray(report.vendor_profiles)
      ? report.vendor_profiles[0]
      : report.vendor_profiles;

    return {
      id: report.id,
      vendorId: report.vendor_id ?? null,
      vendorName: vendorProfile?.business_name ?? "Unknown vendor",
      reason: report.reason ?? "-",
      details: report.details ?? "No report details provided.",
      reportedAt: report.created_at ?? null,
      reporterId: report.reporter_user_id ?? null,
    };
  });

  return {
    items: mapped,
    pagination: {
      page: currentPage,
      pageSize: safePageSize,
      total,
      totalPages,
    },
  };
}

export async function getAdminVendorDetail(
  vendorId: string
): Promise<AdminVendorDetail | null> {
  if (!vendorId) {
    throw new Error("Missing vendorId in getAdminVendorDetail");
  }

  const supabase = createAdminSupabaseClient();

  const { data: vendor, error: vendorError } = await supabase
    .from("vendor_profiles")
    .select(`
      id,
      business_name,
      category,
      city,
      email,
      phone,
      website,
      instagram,
      status,
      description,
      cover_image_url,
      updated_at
    `)
    .eq("id", vendorId)
    .maybeSingle();

  if (vendorError) {
    throw new Error(`Failed to load vendor profile: ${vendorError.message}`);
  }

  if (!vendor) {
    return null;
  }

  const { data: reports, error: reportsError } = await supabase
    .from("vendor_reports")
    .select("id,vendor_id,reason,details,reporter_user_id,created_at")
    .eq("vendor_id", vendorId)
    .order("created_at", { ascending: false });

  if (reportsError) {
    throw new Error(`Failed to load vendor reports: ${reportsError.message}`);
  }

  const { data: services, error: servicesError } = await supabase
    .from("vendor_services")
    .select(
      "id,user_id,title,category,price_from,short_description,is_package,created_at"
    )
    .eq("user_id", vendorId)
    .order("created_at", { ascending: false });

  if (servicesError) {
    throw new Error(`Failed to load vendor services: ${servicesError.message}`);
  }

  const profile = vendor as VendorProfileRow;
  const reportRows = (reports ?? []) as VendorReportRow[];
  const serviceRows = (services ?? []) as VendorServiceRow[];

  return {
    profile: {
      id: profile.id,
      businessName: profile.business_name ?? "Untitled Vendor",
      category: profile.category ?? "Unassigned",
      city: profile.city ?? "-",
      email: profile.email ?? "-",
      phone: profile.phone ?? "-",
      website: profile.website ?? "-",
      instagram: profile.instagram ?? "-",
      status: normalizeVendorStatus(profile.status),
      description: profile.description ?? "No vendor description available yet.",
      coverImageUrl: profile.cover_image_url ?? "",
      updatedAt: profile.updated_at ?? null,
    },
    services: serviceRows.map((service) => ({
      id: service.id,
      title: service.title ?? "Untitled service",
      summary: service.short_description ?? "-",
      category: service.category ?? "-",
      priceFrom: service.price_from ?? "-",
      isPackage: Boolean(service.is_package),
    })),
    reports: reportRows.map((report) => ({
      id: report.id,
      reason: report.reason ?? "Report",
      details: report.details ?? "No additional details provided.",
      reporterId: report.reporter_user_id ?? null,
      createdAt: report.created_at ?? null,
    })),
  };
}

export async function getAdminDashboardSummary(): Promise<AdminDashboardSummary> {
  const supabase = createAdminSupabaseClient();

  const { data: vendorStatuses, error: vendorError } = await supabase
    .from("vendor_profiles")
    .select("status");

  if (vendorError) {
    throw new Error(`Failed to load vendor counts: ${vendorError.message}`);
  }

  const vendorCounts = {
    draft: 0,
    underReview: 0,
    active: 0,
    paused: 0,
    suspended: 0,
    total: 0,
  };

  const statusRows = (vendorStatuses ?? []) as Pick<
    VendorProfileRow,
    "status"
  >[];

  statusRows.forEach((row) => {
    const status = normalizeVendorStatus(row.status);

    vendorCounts.total += 1;

    switch (status) {
      case "under_review":
        vendorCounts.underReview += 1;
        break;
      case "active":
        vendorCounts.active += 1;
        break;
      case "paused":
        vendorCounts.paused += 1;
        break;
      case "suspended":
        vendorCounts.suspended += 1;
        break;
      case "draft":
      default:
        vendorCounts.draft += 1;
        break;
    }
  });

  const { count: reportCount, error: reportCountError } = await supabase
    .from("vendor_reports")
    .select("id", { count: "exact", head: true });

  if (reportCountError) {
    throw new Error(
      `Failed to load vendor report count: ${reportCountError.message}`
    );
  }

  const { data: recentReports, error: recentReportsError } = await supabase
    .from("vendor_reports")
    .select(
      `
      id,
      vendor_id,
      reason,
      details,
      created_at,
      vendor_profiles:vendor_id (
        business_name
      )
    `
    )
    .order("created_at", { ascending: false })
    .limit(5);

  if (recentReportsError) {
    throw new Error(
      `Failed to load recent vendor reports: ${recentReportsError.message}`
    );
  }

  const recentReportRows = (recentReports ?? []) as (VendorReportRow & {
    vendor_profiles?:
      | { business_name?: string | null }
      | { business_name?: string | null }[]
      | null;
  })[];

  return {
    vendorCounts,
    reportCount: reportCount ?? 0,
    recentReports: recentReportRows.map((report) => {
      const vendorProfile = Array.isArray(report.vendor_profiles)
        ? report.vendor_profiles[0]
        : report.vendor_profiles;

      return {
        id: report.id,
        vendorId: report.vendor_id ?? null,
        vendorName: vendorProfile?.business_name ?? "Unknown vendor",
        reason: report.reason ?? "Report",
        details: report.details ?? "No report details provided.",
        reportedAt: report.created_at ?? null,
      };
    }),
  };
}

export async function updateVendorStatus(
  id: string,
  status: VendorStatus
): Promise<{ id: string; status: VendorStatus } | null> {
  const supabase = createAdminSupabaseClient();

  const { data, error } = await supabase
    .from("vendor_profiles")
    .update({ status })
    .eq("id", id)
    .select("id,status")
    .single();

  if (error) {
    throw new Error(`Failed to update vendor status: ${error.message}`);
  }

  return data ? (data as { id: string; status: VendorStatus }) : null;
}
