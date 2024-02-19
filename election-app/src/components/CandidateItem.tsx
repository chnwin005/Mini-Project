import React from 'react';


import { Candidate } from '@/models/candidate';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

import ManifestoModel from './modals/Manifesto';


interface CandidateProps {
    id: string;
    label: string;
    checked: boolean;
    onChange: (id: string) => void;
    candidate: Candidate;
}

const Candidate = ({ id, label, checked, onChange, candidate }: CandidateProps) => {

    const [showModal, setShowModal] = useState(false);


    return (
        <div className="border shadow-lg rounded-lg p-4 w-96 max-w-md flex items-center justify-between">
        <div className='flex flex-col justify-start w-40'>
            <section>
                <Avatar
                className='w-20 h-20'>
                    <AvatarImage src={candidate.profileImage} alt="@shadcn" />
                    <AvatarFallback>USER</AvatarFallback>
                </Avatar>
                <span className="text-lg font-semibold">{candidate.firstName} {candidate.lastName}</span>
            </section>
            <section>
                <Avatar>
                    <AvatarImage src={candidate.partyLogo} alt="@shadcn" />
                    <AvatarFallback>Logo</AvatarFallback>
                </Avatar>
                <span className="text-sm font-semibold">{candidate.party}</span>
            </section>
        </div>
        <ManifestoModel
            candidate={candidate}
        />
        <div className="ml-auto">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={() => onChange(id)}
                className="w-6 h-6 rounded-full border-2 border-gray-400 focus:outline-none focus:border-blue-500 cursor-pointer"
            />
        </div>
    </div>
    );
};

export default Candidate;