//////////////////////// old ////////////////////
export const SUPPLIER_QUERY_KEYS = {
  LIST: "suppliers",
  DETAIL: "supplier-details",
};

export const TEAM_QUERY_KEYS = {
  LIST: "teams",
  DETAIL: "team-details",
};

export const PRODUCT_QUERY_KEYS = {
  LIST: "products",
  DETAIL: "product-details",
};
/////////////////////////////////////////////////

export const QUERY_KEYS = {
  TEAM: {
    LIST: ["teams"],
    DETAIL: (id) => ["team", id],
  },

  SUPPLIER: {
    LIST: ["suppliers"],
    DETAIL: (id) => ["supplier", id],
  },

  PRODUCT: {
    LIST: ["products"],
    DETAIL: (id) => ["product", id],
  },

  USER: {
    LIST: ["users"],
    DETAIL: (id) => ["user", id],
  },

  INVENTORY: {
    LIST: ["inventory"],
    DETAIL: (id) => ["inventory", id],
  },

  STOCK: {
    LIST: ["stocks"],
    DETAIL: (id) => ["stock", id],
  },

  CONTACT: {
    LIST: ["contacts"],
    DETAIL: (id) => ["contact", id],
  },

  CLIENT: {
    LIST: ["clients"],
    DETAIL: (id) => ["client", id],
  },

  COMPANY: {
    LIST: ["companies"],
    DETAIL: (id) => ["company", id],
  },

  PROJECT: {
    LIST: ["projects"],
    DETAIL: (id) => ["project", id],
  },

  PART: {
    LIST: ["parts"],
    DETAIL: (id) => ["part", id],
  },

  TASK: {
    LIST: ["tasks"],
    DETAIL: (id) => ["task", id],
  },
};
