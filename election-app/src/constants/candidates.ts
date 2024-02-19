import { Candidate } from "@/models/candidate";

// Define candidate data
const candidates: Candidate[] = [{

    id: '1',
    profileImage: 'https://www.advancy.com/wp-content/uploads/2017/06/portrait-defaut.jpg',
    firstName: 'John',
    lastName: 'Smith',
    party: 'UnityProgress Party',
    partyLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWVD6u_hP3r8Tj35heccRC1LSLthzR_e6fwZyDV0LS1gtmjMQWq40vAX3PNO5x96PZ6Qo&usqp=CAU',
    manifesto: 'Embracing diversity, fostering collaboration, and advancing progress for all. We stand united for a brighter future, where every voice is heard and every student thrives.'
  },
  {
    id: '2',
    profileImage: 'https://www.riekertcloete.co.za/wp-content/uploads/2023/06/Corporate-headshots-Paraw-Cape-Town.jpg',
    firstName: 'Jane',
    lastName: 'Fraser',
    party: 'Innovation Alliance',
    partyLogo: 'https://upload.wikimedia.org/wikipedia/en/e/e5/Logo_of_the_National_People%E2%80%99s_Ambassadors.jpg',
    manifesto: 'Pioneering ideas, inspiring change. The Innovation Alliance is committed to pushing boundaries, fostering creativity, and transforming our university into a hub of cutting-edge solutions and forward-thinking initiatives.'
  },
  {
    id: '3',
    profileImage: 'https://media.istockphoto.com/id/638979180/photo/his-confidence-sets-him-apart-from-other-entrepreneurs.jpg?s=612x612&w=0&k=20&c=IwgJIdUqXXwSLfTdKRwjb_aLrfRvohmFdDDTnPjZO1w=',
    firstName: 'Uvir',
    lastName: 'Moodley',
    party: 'Harmony Coalition',
    partyLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/United_Independent_Front_%28SA%29_logo.svg/1200px-United_Independent_Front_%28SA%29_logo.svg.png',
    manifesto: 'Striving for unity in diversity, the Harmony Coalition aims to create a campus environment where understanding, respect, and collaboration flourish. Together, we build a harmonious academic community.'
  },
  {
    id: '4',
    profileImage: 'https://assets-global.website-files.com/6012e499c70b59a1c83addc4/615623b91b844fd1d0ae6eb4_Anthony-0028web%20copy.jpg',
    firstName: 'Bob',
    lastName: 'Marley',
    party: 'Future Vision Party',
    partyLogo: 'https://upload.wikimedia.org/wikipedia/en/7/79/Senegalese_Democratic_Party_logo.png',
    manifesto: 'Envisioning tomorrow, shaping today. The Future Vision Party is dedicated to propelling our university into a future of excellence. Forward-looking policies, innovation, and student empowerment are our guiding principles.'
  },
  {
    id: '5',
    profileImage: 'https://static.vecteezy.com/system/resources/previews/028/595/470/large_2x/chinese-smiling-businessman-isolated-free-photo.jpg',
    firstName: 'Jackie',
    lastName: 'Chan',
    party: 'Liberty Endeavor Party',
    partyLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9c/Democratic_Alliance_logo_%282000%29.svg/150px-Democratic_Alliance_logo_%282000%29.svg.png',
    manifesto: 'Championing freedom and individuality, the Liberty Endeavor Party advocates for student rights and liberties. We believe in fostering an environment where every student has the freedom to pursue their dreams.'
  },
  {
    id: '6',
    profileImage: 'https://static01.nyt.com/images/2020/12/07/business/07JONES-01/07JONES-01-mediumSquareAt3X.jpg',
    firstName: 'Thandeka',
    lastName: 'Zulu',
    party: 'Equality Front',
    partyLogo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d4/Verenigde_Party_logo.svg/1200px-Verenigde_Party_logo.svg.png',
    manifesto: 'Committed to fairness and justice, the Equality Front fights for a level playing field. We strive for equal opportunities, inclusivity, and social justice within our academic community.'
  }
  ];

  export default candidates;