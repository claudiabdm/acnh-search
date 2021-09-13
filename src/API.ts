/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserCritterInfoInput = {
  id: string,
  bugs?: Array< string | null > | null,
  fish?: Array< string | null > | null,
  sea?: Array< string | null > | null,
  art?: Array< string | null > | null,
};

export type ModelUserCritterInfoConditionInput = {
  bugs?: ModelStringInput | null,
  fish?: ModelStringInput | null,
  sea?: ModelStringInput | null,
  art?: ModelStringInput | null,
  and?: Array< ModelUserCritterInfoConditionInput | null > | null,
  or?: Array< ModelUserCritterInfoConditionInput | null > | null,
  not?: ModelUserCritterInfoConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateUserCritterInfoInput = {
  id: string,
  bugs?: Array< string | null > | null,
  fish?: Array< string | null > | null,
  sea?: Array< string | null > | null,
  art?: Array< string | null > | null,
};

export type DeleteUserCritterInfoInput = {
  id?: string | null,
};

export type ModelUserCritterInfoFilterInput = {
  id?: ModelStringInput | null,
  bugs?: ModelStringInput | null,
  fish?: ModelStringInput | null,
  sea?: ModelStringInput | null,
  art?: ModelStringInput | null,
  and?: Array< ModelUserCritterInfoFilterInput | null > | null,
  or?: Array< ModelUserCritterInfoFilterInput | null > | null,
  not?: ModelUserCritterInfoFilterInput | null,
};

export type CreateUserCritterInfoMutationVariables = {
  input: CreateUserCritterInfoInput,
  condition?: ModelUserCritterInfoConditionInput | null,
};

export type CreateUserCritterInfoMutation = {
  createUserCritterInfo:  {
    __typename: "UserCritterInfo",
    id: string,
    bugs: Array< string | null > | null,
    fish: Array< string | null > | null,
    sea: Array< string | null > | null,
    art: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type UpdateUserCritterInfoMutationVariables = {
  input: UpdateUserCritterInfoInput,
  condition?: ModelUserCritterInfoConditionInput | null,
};

export type UpdateUserCritterInfoMutation = {
  updateUserCritterInfo:  {
    __typename: "UserCritterInfo",
    id: string,
    bugs: Array< string | null > | null,
    fish: Array< string | null > | null,
    sea: Array< string | null > | null,
    art: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type DeleteUserCritterInfoMutationVariables = {
  input: DeleteUserCritterInfoInput,
  condition?: ModelUserCritterInfoConditionInput | null,
};

export type DeleteUserCritterInfoMutation = {
  deleteUserCritterInfo:  {
    __typename: "UserCritterInfo",
    id: string,
    bugs: Array< string | null > | null,
    fish: Array< string | null > | null,
    sea: Array< string | null > | null,
    art: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type GetUserCritterInfoQueryVariables = {
  id: string,
};

export type GetUserCritterInfoQuery = {
  getUserCritterInfo:  {
    __typename: "UserCritterInfo",
    id: string,
    bugs: Array< string | null > | null,
    fish: Array< string | null > | null,
    sea: Array< string | null > | null,
    art: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type ListUserCritterInfosQueryVariables = {
  filter?: ModelUserCritterInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserCritterInfosQuery = {
  listUserCritterInfos:  {
    __typename: "ModelUserCritterInfoConnection",
    items:  Array< {
      __typename: "UserCritterInfo",
      id: string,
      bugs: Array< string | null > | null,
      fish: Array< string | null > | null,
      sea: Array< string | null > | null,
      art: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserCritterInfoSubscriptionVariables = {
  owner: string,
};

export type OnCreateUserCritterInfoSubscription = {
  onCreateUserCritterInfo:  {
    __typename: "UserCritterInfo",
    id: string,
    bugs: Array< string | null > | null,
    fish: Array< string | null > | null,
    sea: Array< string | null > | null,
    art: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateUserCritterInfoSubscriptionVariables = {
  owner: string,
};

export type OnUpdateUserCritterInfoSubscription = {
  onUpdateUserCritterInfo:  {
    __typename: "UserCritterInfo",
    id: string,
    bugs: Array< string | null > | null,
    fish: Array< string | null > | null,
    sea: Array< string | null > | null,
    art: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteUserCritterInfoSubscriptionVariables = {
  owner: string,
};

export type OnDeleteUserCritterInfoSubscription = {
  onDeleteUserCritterInfo:  {
    __typename: "UserCritterInfo",
    id: string,
    bugs: Array< string | null > | null,
    fish: Array< string | null > | null,
    sea: Array< string | null > | null,
    art: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner: string | null,
  } | null,
};
