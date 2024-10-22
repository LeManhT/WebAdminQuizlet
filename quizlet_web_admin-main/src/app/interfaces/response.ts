export interface IUserResponse {
  id?: string;
  seqId?: number;
  loginName?: string;
  loginPassword?: string;
  isSuspend?: boolean;
  userName?: string;
  email?: string;
  dateOfBirth?: string;
  timeCreated?: number;
  documents?: IDocumentModel;
  streak?: IStreakData;
  achievement?: IAchievementData;
}

export interface IDocumentModel {
  folders: IFolderModel[];
  studySets: IStudySetModel[];
  flashCards: IFlashCardModel[];
}

export interface IFolderModel {
  id: string;
  name: string;
  timeCreated: number; // Unix timestamp
  description: string;
  countSets: number;
  studySets: IStudySetModel[];
  isSelected?: boolean; // Optional
}

export interface IFlashCardModel {
  id?: string; // Optional with default value ""
  term?: string; // Optional
  definition?: string; // Optional
  timeCreated?: number; // Optional with default value 120
  isPublic?: boolean; // Optional
  setOwnerId?: string; // Optional
  isSelected?: boolean; // Optional
  isUnMark?: boolean; // Optional
  isNew?: boolean; // Optional
  isAnswer?: boolean; // Optional
}

export interface IStudySetModel {
  id: string;
  name: string;
  timeCreated: number;
  folderOwnerId: string;
  description: string;
  idOwner: string;
  countTerm?: number;
  cards: IFlashCardModel[];
  isSelected?: boolean;
  isPublic?: boolean;
  nameOwner: string;
}
export interface IStreakData {
  lastTime: number; // Unix timestamp
  currentStreak: number;
}

export interface ITaskData {
  id: number;
  taskName: string;
  type: string;
  score: number;
  status: number;
  description?: string; // Optional
  condition: number;
  progress: number;
  studied?: boolean; // Optional
}

export interface IAchievementData {
  version: number;
  specialName: string;
  taskList: ITaskData[];
}

export interface IUpdateUserResponse {
  userName?: string;
  email?: string;
  avatar: string;
  dateOfBirth?: string;
  setting?: IUserSetting;
}

export interface IUserSetting {
  darkMode: boolean;
  notification: boolean;
}

export interface ICreateSetRequest {
  name?: string;
  description?: string;
  idFolderOwner?: string;
  isPublish?: boolean;
  allNewCards: IFlashCardModel[];
}
