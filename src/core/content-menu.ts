type ContentMenuItem = {
  title: string;
  slug: string;
  children?: ContentMenuItem[];
};

export const contentMenu: ContentMenuItem[] = [
  {
    title: "คณิตศาสตร์",
    slug: "math",
    children: [
      {
        title: "จำนวนเต็ม",
        slug: "integer",
      },
      {
        title: "เศษส่วนและทศนิยม",
        slug: "fraction-and-decimal",
      },
    ],
  },
];
