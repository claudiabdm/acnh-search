/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserCritterInfo = /* GraphQL */ `
  query GetUserCritterInfo($id: ID!) {
    getUserCritterInfo(id: $id) {
      id
      bugs
      fish
      sea
      art
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserCritterInfos = /* GraphQL */ `
  query ListUserCritterInfos(
    $filter: ModelUserCritterInfoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserCritterInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        bugs
        fish
        sea
        art
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
