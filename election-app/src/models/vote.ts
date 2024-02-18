import { Voter } from "./voter";

export interface Vote {
    id: string;  
    voter: Voter
    candidateId: string; 
    timestamp: Date; 
  }
  