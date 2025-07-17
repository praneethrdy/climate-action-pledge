export interface PledgeData {
  id: string;
  name: string;
  email: string;
  mobile: string;
  state: string;
  profileType: 'Student' | 'Working Professional' | 'Other';
  commitments: string[];
  date: string;
  heartsRating: number;
}

export interface CommitmentTheme {
  title: string;
  commitments: string[];
}

export interface KPIData {
  targetPledges: number;
  achievedPledges: number;
  students: number;
  workingProfessionals: number;
  workshops: number;
}