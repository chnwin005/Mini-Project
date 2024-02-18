
"use client";
// Import necessary modules
import Image from 'next/image'
import CandidateItem from '@/components/CandidateItem'
import { useState } from 'react';
import { Candidate } from '@/models/candidate';
import { useEffect } from 'react';

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
import { AuthContext } from "@/provider/AuthProvider";
import { useRouter } from 'next/navigation';
import useAuthentication from '@/hooks/useAuthentication';
import database from '@/util/database';
import { Vote } from '@/models/vote';
import { UUID } from 'crypto';
import { auth } from '@/util/firebase';
import { Voter } from '@/models/voter';
import { HOME_ROUTE } from '@/constants/routes';




// Define the Home component
export default function Home() {
  // Initialize state to manage the checked candidate ID
  const [checkedId, setCheckedId] = useState("");
  const [voter, setVoter] = useState<any>();
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState('');
  const router = useRouter();


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);

        const userID = user.uid;
        ``
        const promisedVoter: Promise<Voter | undefined> = database.getVoter(userID);

        promisedVoter.then((voter) => {
          if (voter) {
            setVoter(voter);
          }
        });


      }
    });
  }
    , []);


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
    profileImage: 'profile4.jpg', // Placeholder - use a real image URL
    firstName: 'Bob',
    lastName: 'Marley',
    party: 'Future Vision Party',
    partyLogo: 'party4.jpg',
    manifesto: 'Envisioning tomorrow, shaping today. The Future Vision Party is dedicated to propelling our university into a future of excellence. Forward-looking policies, innovation, and student empowerment are our guiding principles.'
  },
  {
    id: '5',
    profileImage: 'profile5.jpg', // Placeholder - use a real image URL
    firstName: 'Thomas',
    lastName: 'Du Plessis',
    party: 'Liberty Endeavor Party',
    partyLogo: 'party5.jpg',
    manifesto: 'Championing freedom and individuality, the Liberty Endeavor Party advocates for student rights and liberties. We believe in fostering an environment where every student has the freedom to pursue their dreams.'
  },
  {
    id: '6',
    profileImage: 'profile6.jpg', // Placeholder - use a real image URL
    firstName: 'Georgia',
    lastName: 'Foster',
    party: 'Equality Front',
    partyLogo: 'party6.jpg',
    manifesto: 'Committed to fairness and justice, the Equality Front fights for a level playing field. We strive for equal opportunities, inclusivity, and social justice within our academic community.'
  }
  ];

  const handleSubmit = async () => {
    const selectedCandidateIndex = candidates.findIndex(candidate => candidate.id === checkedId);
    const thisVoter = voter;
    const vote: Vote = {
      // party id is a string
      party_id: candidates[selectedCandidateIndex].id,
      voter: thisVoter,
      // get random 6 digit
      vote_id: `v_${Math.floor(100000 + Math.random() * 900000)}`
    }

    try {
      await database.addVote(vote);
      console.log('Vote added: ', vote);
      alert('Succesfully');
      router.push(HOME_ROUTE);
    } catch (error) {
      console.error('Error adding vote: ', error);
    }
  }

  const selectedCandidate = candidates.find(candidate => candidate.id === checkedId);


  // Return JSX for rendering
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold mb-4">Vote for your favourite candidate</h1>
      {voter ? ( // Check if voter is found
        <div className="flex flex-col items-start gap-4">
          <p>
            Welcome, {voter.firstName} {voter.lastName} from {voter.province} province.
          </p>
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
      ) : (
        <p>Loading user data...</p> // Render loading message while waiting for voter to be found
      )}

      {selectedCandidate && (
        <Confirmation candidate={selectedCandidate} onSubmit={handleSubmit} />
      )}
    </div>
  )
}