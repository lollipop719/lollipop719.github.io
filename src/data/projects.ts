import { Project } from '../types';

export const projects: Record<string, Project[]> = {
  'Coding': [
    {
      title: 'Birthday Present Recommendation App',
      description: 'A full-stack birthday present recommendation app built with Kotlin and Gemini API. There were three tabs: 1. Gift List, 2. Top 20 Gifts by Filterable by Various Categories, 3. Gift Recommendation by AI. We aimed at reducing the time spent on searching for a present, while improving the choice that the user would make.',
      imageUrl: '/assets/images/project1.png',
      technologies: ['Kotlin', 'Python', 'Gemini API'],
      githubUrl: 'https://github.com/lollipop719/BirthdayGift',
      liveUrl: 'N/A',
    },
    {
      title: 'BootCamp Management Dashboard',
      description: 'Our New 몰캠 Portal is a unified automated system, streamlining the entire camp operation from application to evaluation, team assignment, and result notification. AI scoring functionality automatically calculates development capability, passion, and diversity scores based on essays, while enabling one-click pass/fail email distribution. To realize the core value of "diversity" of KAIST Bootcamp (몰입캠프), we used a diversity-based team matching algorithm using Genetic Algorithm.',
      imageUrl: '/assets/images/project2.png',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Python', 'Flask', 'Google OAuth2 Client', 'Gemini API'],
      githubUrl: 'https://github.com/lollipop719/CampTeamMaker',
      liveUrl: 'https://campteammaker.onrender.com/',
    },
    {
      title: 'Nupzuki Racing Game',
      description: 'PVP racing game where KAIST mascot Nubzuki runs away from the police while going to class at KAIST. User gets to choose between car and motorcycle, and we added drifting mechanics to add even more fun! One player becomes student Nubzuki, and the other becomes the police Nubzuki. Blender was used to make the 3D models of Nubzuki, and Websocket to make game room and synchronize the game state between the server and the clients.',
      imageUrl: '/assets/images/project3.png',
      technologies: ['Unity (C#)', 'Blender', 'Websocket'],
      githubUrl: 'N/A',
    },
    {
      title: 'Air Traffic Control Simulator',
      description: 'This project is an Automatic Air Traffic Control System with three algorithms: Greedy, hybrid of MIPS and PALS, and Reinforced Learning. All algorithms were designed to abide by the actual air traffic control rules at Gimpo International Airport, while taking into account the flight takeoff and landing times, landing risk based on weather forecasts, and emergency situations. The website UI visualizes the flight paths, the weather, the decisions that the algorithm makes, and the current state of the runways and taxiways.',
      imageUrl: '/assets/images/project4.jpg',
      technologies: ['React', 'Javascript', 'Websocket', 'Reinforced Learning'],
      githubUrl: 'https://github.com/lollipop719/Week4_Front',
      liveUrl: 'https://week4-front.vercel.app/',
    },
  ],
  'Startup': [
    {
      title: 'Bluechip',
      description: 'A startup club aimed at lowering the barrier of entry for startups',
      imageUrl: '/assets/images/bluechip_logo.png',
      technologies: ['Project Management'],
    },
    {
      title: 'Side With Startups',
      description: 'A startup camp connecting startups with students, for students to carry out actual projects of the startups',
      imageUrl: '/assets/images/startup1.jpg',
      technologies: ['Project Management', 'Advertising', 'Fundraising'],
    },
  ],
  'Art': [
    {
      title: 'Digital Art Collection',
      description: 'A series of digital artworks exploring nature and technology',
      imageUrl: '/assets/images/art1.jpg',
      technologies: ['Procreate', 'Photoshop', 'Blender'],
    },
    {
      title: 'UI/UX Design Portfolio',
      description: 'Collection of interface designs for various applications',
      imageUrl: '/assets/images/art2.jpg',
      technologies: ['Figma', 'Adobe XD', 'Principle'],
    },
    {
      title: 'Motion Graphics',
      description: 'Animated graphics and transitions for web and mobile',
      imageUrl: '/assets/images/art3.jpg',
      technologies: ['After Effects', 'Lottie', 'Rive'],
    },
  ],
};
