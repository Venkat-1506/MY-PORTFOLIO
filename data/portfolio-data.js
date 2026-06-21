// ============================================
// data/portfolio-data.js — CONTENT
// ============================================

const portfolioData = {
    projects: [{
        id: "finder",
        title: "FIND-ER",
        featured: true,
        problem: "Students lose items on campus daily with no efficient way to report or recover them.",
        challenge: "Building a real-time tracking system with no backend — needed to work with localStorage and manual updates.",
        solution: "Campus Lost & Found Management System featuring Student and Admin dashboards, messaging, notifications, and recovery tracking. Designed to streamline the process of reporting, searching, and recovering lost items within a campus environment.",
        features: ["Lost Item Reporting", "Found Item Reporting", "Student Dashboard", "Admin Dashboard", "Search Functionality", "Recovery Tracking"],
        techStack: ["HTML", "CSS", "JavaScript", "Local Storage"],
        lessonsLearned: "Learned that building a functional app without a backend teaches you to be creative with browser APIs. The tracking system works entirely through localStorage and custom events.",
        githubUrl: "https://github.com/Venkat-1506/FIND-ER",
        liveUrl: "https://find-er-campus.netlify.app/welcome.html",
        previewImage: "assets/projects/FIND_ER.png"
    }, {
        id: "spendly",
        title: "Spendly",
        featured: true,
        problem: "People struggle to track their spending and manage finances effectively.",
        challenge: "Building a simple but effective expense tracker that encourages regular use through good UX.",
        solution: "Modern SaaS-style expense tracker built for Indian users to manage expenses, budgets, and financial goals. Features smart analytics, intuitive UI, and responsive design.",
        features: ["Expense Management", "Expense Tracking", "Financial Insights", "Category Filtering"],
        techStack: ["HTML", "CSS", "JavaScript"],
        lessonsLearned: "The biggest lesson was that users need immediate feedback. Adding visual spending breakdowns and quick-add buttons dramatically improved the app's usability during testing.",
        githubUrl: "https://github.com/Venkat-1506/Spendly",
        liveUrl: "",
        previewImage: "assets/projects/Spendly.png"
    }, {
        id: "elite",
        title: "Elite College Portal",
        featured: true,
        problem: "College websites are outdated and difficult to navigate for students and faculty.",
        challenge: "Creating a modern, responsive design that works across all devices while maintaining a professional academic feel.",
        solution: "Professional multi-page college portal featuring responsive design, admissions and contact forms, AI chatbot integration, and modern UI/UX components.",
        features: ["Admissions Section", "Academic Information", "Responsive Design", "Contact Forms", "Modern UI"],
        techStack: ["HTML", "CSS", "JavaScript"],
        lessonsLearned: "Discovered that good design isn't just about aesthetics — it's about information architecture. Rearranging the navigation twice before launch taught me to think from the user's perspective first.",
        githubUrl: "https://github.com/Venkat-1506/ELITE-COLLEGE-PORTAL",
        liveUrl: "https://elite-college-portal.netlify.app/",
        previewImage: "assets/projects/ELITE-COLLEGE.png"
    }, {
        id: "handwriting",
        title: "Handwritten Character Recognition",
        featured: false,
        problem: "Recognizing handwritten digits manually is time-consuming and error-prone.",
        challenge: "Build a deep learning model that can accurately classify handwritten digits from the MNIST dataset.",
        solution: "Deep Learning-based handwritten digit recognition system using Convolutional Neural Networks (CNN) trained on the MNIST dataset, achieving approximately 97% accuracy.",
        features: ["Digit recognition", "CNN architecture", "MNIST dataset", "97% accuracy"],
        techStack: ["Python", "TensorFlow", "CNN"],
        lessonsLearned: "Understanding CNN architecture, data preprocessing, and model optimization were key to achieving high accuracy on image classification.",
        githubUrl: "https://github.com/Venkat-1506/CodeAlpha_HandwrittenRecognition",
        liveUrl: "",
        previewImage: "assets/projects/handwriting.png"
    }, {
        id: "stock-trading",
        title: "Stock Trading Platform",
        featured: false,
        problem: "Understanding stock market operations requires practical simulation.",
        challenge: "Design a console-based Java application that simulates real stock trading scenarios.",
        solution: "Console-based Java application that simulates stock market operations including portfolio management, transaction tracking, and stock trading.",
        features: ["Portfolio management", "Transaction tracking", "Stock trading simulation", "Console interface"],
        techStack: ["Java", "OOP"],
        lessonsLearned: "Object-oriented design principles are crucial for modeling real-world financial systems in a maintainable way.",
        githubUrl: "https://github.com/Venkat-1506/CodeAlpha_StockTradingPlatform",
        liveUrl: "",
        previewImage: "assets/projects/stock-trading.png"
    }, {
        id: "hotel-reservation",
        title: "Hotel Reservation System",
        featured: false,
        problem: "Manual hotel booking processes are inefficient and error-prone.",
        challenge: "Build a comprehensive booking management system using OOP principles in Java.",
        solution: "Console-based hotel booking application supporting room reservations, cancellations, payment simulation, and booking management using Object-Oriented Programming principles.",
        features: ["Room reservations", "Cancellations", "Payment simulation", "Booking management"],
        techStack: ["Java", "OOP"],
        lessonsLearned: "Design patterns and proper separation of concerns make complex business logic easier to manage and extend.",
        githubUrl: "https://github.com/Venkat-1506/CodeAlpha_HotelReservationSystem",
        liveUrl: "",
        previewImage: "assets/projects/hotel-reservation.png"
    }, {
        id: "oops-java",
        title: "OOPS Java Projects",
        featured: false,
        problem: "Understanding OOP principles requires hands-on practice with diverse real-world systems.",
        challenge: "Design and implement multiple console-based applications that collectively demonstrate core OOP concepts.",
        solution: "A comprehensive collection of Java console-based applications including Library Management, Student Management, Bank Account, Hospital Management, Employee Payroll, Inventory Management, Movie Ticket Booking, Food Delivery, Online Shopping, Vehicle Rental, and Chat Simulation Systems. Showcases Encapsulation, Inheritance, Polymorphism, Abstraction, Interfaces, Exception Handling, Collections Framework, and Strategy Design Pattern.",
        features: ["Library Management", "Student Management", "Bank Account", "Hospital Management", "Employee Payroll", "Inventory Management", "Movie Ticket Booking", "Food Delivery", "Online Shopping", "Vehicle Rental", "Chat Simulation"],
        techStack: ["Java", "OOP", "Collections Framework", "Exception Handling"],
        lessonsLearned: "Building multiple real-world systems in parallel reinforced how OOP principles like encapsulation and polymorphism create maintainable, scalable code. Design patterns like Strategy made it easy to swap algorithms without changing the core logic.",
        githubUrl: "https://github.com/Venkat-1506/OOPS-Java-Projects",
        liveUrl: "",
        previewImage: "assets/projects/oops-java.png"
    }],

    roadmap: [
        { title: "Data Engineering Fundamentals", description: "Master SQL, PostgreSQL, data modeling, and ETL processes." },
        { title: "Cloud Data Tools", description: "Learn AWS/GCP data services, cloud storage, and serverless data processing." },
        { title: "Big Data Technologies", description: "Explore Spark, Hadoop, and distributed data processing frameworks." },
        { title: "Machine Learning Engineering", description: "Build ML pipelines and deploy models to production." }
    ],

    skills: [
        { title: "Languages", items: ["Java", "Python", "JavaScript", "SQL"] },
        { title: "Frontend", items: ["HTML5", "CSS3", "Responsive Design"] },
        { title: "Tools", items: ["Git", "GitHub", "VS Code", "Netlify"] },
        { title: "Data", items: ["Pandas", "Data Analysis"] },
        { title: "Currently Learning", items: ["Data Engineering", "Cloud Computing", "PostgreSQL"] }
    ],

    certificates: [
        { title: "NPTEL Elite", issuer: "NPTEL", category: "Programming", image: "assets/certificates/NPTEL.jpg", achievement: "Elite Grade", description: "Completed NPTEL's elite-level certification demonstrating strong proficiency in programming fundamentals and problem-solving techniques through rigorous online assessment." },
        { title: "Microsoft Canvas App", issuer: "Microsoft", category: "Cloud", image: "assets/certificates/Microsoft-Canvas-App.png", achievement: "", description: "Earned Microsoft's certification in Canvas App development, covering low-code application building using Power Apps with connectors and business logic." },
        { title: "Microsoft Secure Storage", issuer: "Microsoft", category: "Cloud", image: "assets/certificates/Microsoft-secure-storage.png", achievement: "", description: "Microsoft certification focused on secure cloud storage solutions — data encryption, access management, and compliance in Azure environments." },
        { title: "Java Certification", issuer: "HackerRank", category: "Programming", image: "assets/certificates/Hackerrank-java.png", achievement: "", description: "HackerRank skill certification validating core Java proficiency including OOP, collections, exception handling, data structures, and algorithmic problem solving." },
        { title: "FreeCodeCamp (v9)", issuer: "FreeCodeCamp", category: "Frontend", image: "assets/certificates/Freecodecamp-v9.png", achievement: "", description: "FreeCodeCamp's responsive web design certification (v9) covering HTML5, CSS3, Flexbox, CSS Grid, and accessible, mobile-first web development." },
        { title: "FreeCodeCamp (v8)", issuer: "FreeCodeCamp", category: "Frontend", image: "assets/certificates/Freecodecamp-v8.png", achievement: "", description: "FreeCodeCamp's legacy responsive web design certification (v8) with foundational training in HTML, CSS, visual design, and building real-world projects." },
        { title: "Senior Typewriting", issuer: "Government", category: "Professional", image: "assets/certificates/Typewriting-senior.png", achievement: "First Class With Distinction", description: "Government-certified Senior Grade Typewriting with First Class Distinction, demonstrating high-speed accuracy and professional document preparation skills." },
        { title: "HTML Certification", issuer: "Udemy", category: "Frontend", image: "assets/certificates/Udemy-HTML.png", achievement: "", description: "Udemy certification covering modern HTML5 — semantic markup, forms, multimedia, accessibility best practices, and structuring web content." },
        { title: "CSS Certification", issuer: "Udemy", category: "Frontend", image: "assets/certificates/Udemy-CSS.png", achievement: "", description: "Udemy certification in modern CSS3 including Flexbox, Grid, animations, responsive design patterns, and cross-browser styling techniques." },
        { title: "Java & Python", issuer: "Training Program", category: "Programming", image: "assets/certificates/java-python.png", achievement: "", description: "Structured training program covering both Java and Python programming — OOP principles in Java and scripting, data structures, and automation in Python." },
        { title: "Claude AI", issuer: "AI Workshop", category: "AI", image: "assets/certificates/claude.png", achievement: "", description: "Workshop certification in leveraging Claude AI for practical applications — prompt engineering, AI-assisted development, and responsible AI usage." },
        { title: "B10X Workshop", issuer: "B10X", category: "Workshop", image: "assets/certificates/workshop-B10X.png", achievement: "", description: "B10X workshop certification covering exponential thinking, innovation frameworks, and building technology solutions with a 10X mindset." }
    ],

    beyondCoding: [
        { title: "Chess, Cricket & Travel", description: "I play chess and cricket, love exploring new things, and enjoy travelling whenever I get the chance." },
        { title: "Typewriting", description: "Senior Grade with Distinction — I value precision and speed in all forms of communication." },
        { title: "Continuous Learning", description: "Always reading, always curious. I believe the best engineers never stop learning." }
    ],

    social: {
        github: "https://github.com/Venkat-1506",
        linkedin: "https://www.linkedin.com/in/venkatasaarathy-r-73a226386",
        instagram: "https://www.instagram.com/_venkat_1506/",
        twitter: "",
        leetcode: "https://leetcode.com/u/Venkatasaarathy/",
        mail: "venkatasaarathy@gmail.com",
        location: "India"
    }
};

// Make available globally
window.portfolioData = portfolioData;