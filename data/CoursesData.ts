// Define the Course type
type Course = {
  title: string;
  description: string;
  imgSrc: string;
  href: string;
};

// Your data array with the Course type applied
const CoursesData: Course[] = [
  {
    title: 'W001: Introduction to Modern Computing - Spring 2025',
    description: `Ever wanted to learn about code but found it too difficult? This 8-week course will take you through the fundamentals of coding languages, like Python, JavaScript, and CSS to help you get coding fast.`,
    imgSrc: '/static/images/code.jpg',
    href: '#', // Placeholder, could be handled or removed if no link
  },
]

export default coursesData;
