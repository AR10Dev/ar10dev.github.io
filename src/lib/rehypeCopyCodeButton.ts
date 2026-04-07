type HastNode = {
  type?: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
  value?: string;
};

const isElement = (node: HastNode, tagName: string) =>
  node.type === "element" && node.tagName === tagName;

const classListFromNode = (node: HastNode): string[] => {
  const className = node.properties?.className;

  if (Array.isArray(className)) {
    return className.filter(
      (value): value is string => typeof value === "string",
    );
  }

  if (typeof className === "string") {
    return className.split(/\s+/).filter(Boolean);
  }

  return [];
};

const hasClassName = (node: HastNode, className: string) =>
  classListFromNode(node).includes(className);

const addClassName = (node: HastNode, className: string) => {
  const nextClassList = classListFromNode(node);

  if (!nextClassList.includes(className)) {
    nextClassList.push(className);
  }

  if (!node.properties) {
    node.properties = {};
  }

  node.properties.className = nextClassList;
};

const preHasCodeChild = (node: HastNode) =>
  node.children?.some((child) => isElement(child, "code")) ?? false;

const preHasCopyButton = (node: HastNode) =>
  node.children?.some(
    (child) =>
      isElement(child, "button") &&
      hasClassName(child, "code-copy-button") &&
      Object.hasOwn(child.properties ?? {}, "data-code-copy"),
  ) ?? false;

const createCopyButtonNode = (): HastNode => ({
  type: "element",
  tagName: "button",
  properties: {
    type: "button",
    className: ["code-copy-button"],
    "data-code-copy": "",
    "aria-label": "Copy code block",
    title: "Copy code",
  },
  children: [{ type: "text", value: "Copy" }],
});

export default function rehypeCopyCodeButton() {
  return (tree: HastNode) => {
    const visit = (node: HastNode) => {
      if (
        isElement(node, "pre") &&
        preHasCodeChild(node) &&
        !preHasCopyButton(node)
      ) {
        if (!node.children) {
          node.children = [];
        }

        node.children.unshift(createCopyButtonNode());
        addClassName(node, "has-code-copy-button");
      }

      node.children?.forEach(visit);
    };

    visit(tree);
  };
}
