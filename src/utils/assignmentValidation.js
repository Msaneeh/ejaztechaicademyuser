export const DEFAULT_REQUIREMENTS = [
  "Create a component with at least two props.",
  "Use the component more than once with different values.",
  "Include a short explanation of how the component works.",
  "Push your project to a public GitHub repository and submit the link.",
];

const GITHUB_URL =
  /^https?:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+(\/.*)?$/i;

export function validateSubmission(draft) {
  return {
    projectName: draft?.projectName?.trim()
      ? ""
      : "Enter a project name.",
    githubUrl: GITHUB_URL.test(draft?.githubUrl?.trim())
      ? ""
      : "Enter a GitHub repository link, like https://github.com/username/project.",
    description:
      draft?.description?.trim().length >= 20
        ? ""
        : "Write at least a sentence or two about your project.",
  };
}

export const hasErrors = (errors) => Object.values(errors).some(Boolean);