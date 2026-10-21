const initialNotifications = [
  {
    id: "n1",
    type: "course",
    title: "New lesson added",
    message: "Eng. Ejaz just added 'React Performance Optimization' to React Fundamentals.",
    time: "2 hours ago",
    read: false,
    link: "/learn/react-fundamentals",
  },
  {
    id: "n2",
    type: "certificate",
    title: "Certificate Earned",
    message: "Congratulations! You've completed HTML & CSS Essentials and earned your certificate.",
    time: "1 day ago",
    read: false,
    link: "/certificates",
  },
  {
    id: "n3",
    type: "message",
    title: "New reply from mentor",
    message: "Eng. Yusuf replied to your question in the AI Engineering discussion.",
    time: "2 days ago",
    read: true,
    link: "/learn/ai-engineering",
  },
  {
    id: "n4",
    type: "system",
    title: "Welcome to EJAZTECH.AI",
    message: "Thanks for joining! Start exploring courses to build your skills.",
    time: "1 week ago",
    read: true,
    link: "/explore",
  },
];

export default initialNotifications