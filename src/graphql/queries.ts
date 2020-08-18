/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncUserCritterInfos = /* GraphQL */ `
  query SyncUserCritterInfos(
    $filter: ModelUserCritterInfoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserCritterInfos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        bugs
        fish
        sea
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getUserCritterInfo = /* GraphQL */ `
  query GetUserCritterInfo($id: ID!) {
    getUserCritterInfo(id: $id) {
      id
      bugs
      fish
      sea
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
