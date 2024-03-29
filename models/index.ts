export type User = {
  id: string;
  name: string;
  teamId?: string;
  roomId?: string;
  status?: "IDLE" | "ACTIVE";
};

export type Team = {
  id: string;
  name: string;
  members: User[];
  topGuess: {
    score: number;
    rank: number;
  };
  _count: {
    members: number;
    guesses: number;
  };
};

export type Room = {
  id: string;
  name: string;
  teams: (Team & {
    _count?: {
      members: number;
      guesses: number;
    };
    topGuess: {
      score: number;
      rank: number;
    };
  })[];
};

export type Guess = {
  id: string;
  word: string;
  score: number;
  rank: number;
  owner: {
    name: string;
  };
  team: string;
  serialNumber: number;
};

export type GuessCreationInput = {
  word: string;
  ownerId: string;
  teamId: string;
  roomId: string;
};
