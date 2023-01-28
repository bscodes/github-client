import { DocumentNode, gql } from '@apollo/client';

export const SEARCH_USERS: DocumentNode = gql`
  query ($searchQuery: String!) {
    viewer {
      login
      name
    }
    search(query: $searchQuery, type: USER, first: 20) {
      edges {
        node {
          ... on User {
            id
            repositories(first: 20) {
              edges {
                node {
                  name
                  watchers {
                    totalCount
                  }
                  stargazers {
                    totalCount
                  }
                  id
                  owner {
                    ... on User {
                      id
                      login
                      name
                    }
                  }
                }
              }
              totalCount
            }
            starredRepositories {
              totalCount
            }
            name
            login
            avatarUrl(size: 120)
          }
        }
      }
    }
  }
`;

export const GET_USER_REPOSITORIES: DocumentNode = gql`
  query ($owner: String!) {
    user(login: $owner) {
      repositories(first: 100) {
        edges {
          node {
            id
            name
            description
            url
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
            primaryLanguage {
              name
            }
          }
        }
      }
    }
  }
`;

export const GET_REPO: DocumentNode = gql`
  query ($owner: String!, $name: String!) {
    repositoryOwner(login: $owner) {
      repository(name: $name) {
        issues(states: OPEN, first: 20) {
          nodes {
            number
            title
            createdAt
            author {
              login
              ... on User {
                name
              }
            }
          }
        }
        stargazers {
          totalCount
        }
        watchers {
          totalCount
        }
        id
      }
    }
  }
`;

export const CREATE_ISSUE: DocumentNode = gql`
  mutation CreateIssue($repositoryId: ID!, $title: String!, $body: String!) {
    createIssue(
      input: { repositoryId: $repositoryId, title: $title, body: $body }
    ) {
      issue {
        number
        body
      }
    }
  }
`;
