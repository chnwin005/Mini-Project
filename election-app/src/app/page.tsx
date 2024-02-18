
"use client";
// Import necessary modules
import Image from 'next/image'
import CandidateItem from '@/components/CandidateItem'
import { useState } from 'react';
import { Candidate } from '@/models/candidate';

import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Confirmation from '@/components/modals/Confirmation';



// Define the Home component
export default function Home() {
  // Initialize state to manage the checked candidate ID
  const [checkedId, setCheckedId] = useState("");

  // Function to handle checkbox change
  const handleChange = (id: string) => {
    setCheckedId(id);
  };

  // Define candidate data
  const candidates: Candidate[] = [{

    id: '1',
    profileImage: 'profile1.jpg',
    firstName: 'John',
    lastName: 'Smith',
    party: 'UnityProgress Party',
    partyLogo: 'party1.jpg',
    manifesto: 'Embracing diversity, fostering collaboration, and advancing progress for all. We stand united for a brighter future, where every voice is heard and every student thrives.'
  },
  {
    id: '2',
    profileImage: 'profile2.jpg',
    firstName: 'Jane',
    lastName: 'Fraser',
    party: 'Innovation Alliance',
    partyLogo: 'party2.jpg',
    manifesto: 'Pioneering ideas, inspiring change. The Innovation Alliance is committed to pushing boundaries, fostering creativity, and transforming our university into a hub of cutting-edge solutions and forward-thinking initiatives.'
  },
  {
    id: '3',
    profileImage: 'profile3.jpg',
    firstName: 'Michael',
    lastName: 'Johnson',
    party: 'Harmony Coalition',
    partyLogo: 'party3.jpg',
    manifesto: 'Striving for unity in diversity, the Harmony Coalition aims to create a campus environment where understanding, respect, and collaboration flourish. Together, we build a harmonious academic community.'
  },
  {
    id: '4',
    profileImage: 'profile4.jpg',
    firstName: 'Bob',
    lastName: 'Marley',
    party: 'Future Vision Party',
    partyLogo: 'party4.jpg',
    manifesto: 'Envisioning tomorrow, shaping today. The Future Vision Party is dedicated to propelling our university into a future of excellence. Forward-looking policies, innovation, and student empowerment are our guiding principles.'
  },
  {
    id: '5',
    profileImage: 'profile5.jpg',
    firstName: 'Thomas',
    lastName: 'Du Plessis',
    party: 'Liberty Endeavor Party',
    partyLogo: 'party5.jpg',
    manifesto: 'Championing freedom and individuality, the Liberty Endeavor Party advocates for student rights and liberties. We believe in fostering an environment where every student has the freedom to pursue their dreams.'
  },
  {
    id: '6',
    profileImage: 'profile6.jpg',
    firstName: 'Georgia',
    lastName: 'Foster',
    party: 'Equality Front',
    partyLogo: 'party6.jpg',
    manifesto: 'Committed to fairness and justice, the Equality Front fights for a level playing field. We strive for equal opportunities, inclusivity, and social justice within our academic community.'
  }
  ];

  const selectedCandidate = candidates.find(candidate => candidate.id === checkedId);

  // Return JSX for rendering
  return (
    <div className="flex flex-col items-center gap-4 bg-[#F5F8FC] pt-20 pb-10">
      <h1 className="text-2xl font-bold mb-4 pt-8">Vote for your future leader</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8">

        {/* Map over candidates and render Candidate components */}
        {candidates.map((candidate) => (
          <CandidateItem
            key={candidate.id}
            id={candidate.id}
            label={candidate.firstName}
            checked={checkedId === candidate.id}
            onChange={handleChange}
            candidate={candidate}
          />
        ))}
      </div>

      {selectedCandidate && (
        <Confirmation candidate={selectedCandidate} />
      )}

    </div>
  )
}