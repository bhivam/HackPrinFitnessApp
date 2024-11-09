import { Client } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.jsm.puhack',
  projectId: '672fa8bb001aaeb48a92',
  databaseId: '672fab470028d9a83c1b',
  userCollectionId: '672fab6c000f6cbfe941',
  videoCollectionId: '672fab84000267ed375d',
  storageId: '672fac8e0026f0fb939e',
};
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

export const createUser = () => {
  account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe').then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};

const account = new Account(client);
