export const fakeTemplates = [
  {
    id: "1",
    userId: "user_2sXBo23uFnzhYCJzAu4MUyyWoox",
    title: "Template 1",
    description: "This is a template description.",
    likeCount: 10,
    imageUrl: "",
    questions: [
      { id: "q1", text: "What is your name?", type: "text", position: 0 },
      { id: "q2", text: "How old are you?", type: "number", position: 1 },
      {
        id: "q3",
        text: "Select your favorite color:",
        type: "checkbox",
        position: 2,
      },
    ],
  },
  {
    id: "2",
    userId: "user_2sXBo23uFnzhYCJzAu4MUyyWooxa",
    title: "Template 2",
    description: "Another template description.",
    likeCount: 20,
    imageUrl: "",
    questions: [
      { id: "q1", text: "What is your name?", type: "text", position: 2 },
      { id: "q2", text: "How old are you?", type: "number", position: 0 },
      {
        id: "q3",
        text: "Select your favorite color:",
        type: "checkbox",
        position: 1,
      },
    ],
  },
];
