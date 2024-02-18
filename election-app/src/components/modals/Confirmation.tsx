import React from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '../ui/dialog'
import { ModalProps } from './Manifesto'




const Confirmation:  React.FC<ModalProps> = ( {candidate}  ) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Vote Now</Button> */}
        <button className="bg-[#BB2D3B] text-white font-bold py-2 px-4 rounded-md mt-4">Vote Now</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle
          className='text-2xl font-semibold'
          >
            Vote confirmation
          </DialogTitle>
            <p>
            You are about to vote for {candidate.firstName} {candidate.lastName} of the {candidate.party} party. Are you sure you want to proceed?
            </p>
        </DialogHeader>
        
        <DialogFooter>
          <Button >Yes, I am sure</Button>
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Confirmation