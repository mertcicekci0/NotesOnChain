import {
  openContractCall,
  showConnect,
  UserSession,
  AppConfig,
} from '@stacks/connect';
import {
  AnchorMode,
  PostConditionMode,
  stringAsciiCV,
  uintCV,
  principalCV,
  fetchCallReadOnlyFunction,
  cvToJSON,
} from '@stacks/transactions';
import { STACKS_TESTNET } from '@stacks/network';

// Configuration
const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

const contractAddress = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM';
const contractName = 'notes';
const network = STACKS_TESTNET; // Use testnet for development

export interface Note {
  content: string;
  created: number;
}

// Connect wallet
export const connectWallet = () => {
  showConnect({
    userSession,
    appDetails: {
      name: 'Stacks Notes',
      icon: 'https://freesvg.org/img/1541103084.png', // Simple note icon
    },
    onFinish: () => {
      window.location.reload();
    },
    onCancel: () => {
      console.log('User cancelled');
    },
  });
};

// Disconnect wallet
export const disconnectWallet = () => {
  userSession.signUserOut();
  window.location.reload();
};

// Add a note
export const addNote = async (content: string) => {
  if (!userSession.isUserSignedIn()) {
    throw new Error('User not signed in');
  }

  if (content.length > 200) {
    throw new Error('Note content too long (max 200 characters)');
  }

  const options = {
    contractAddress,
    contractName,
    functionName: 'add-note',
    functionArgs: [stringAsciiCV(content)],
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    onFinish: (data: { txId: string }) => {
      console.log('Transaction submitted:', data.txId);
      return data;
    },
    onCancel: () => {
      console.log('Transaction cancelled');
    },
  };

  return openContractCall(options);
};

// Get a specific note
export const getNote = async (userPrincipal: string, noteId: number) => {
  try {
    const result = await fetchCallReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-note',
      functionArgs: [principalCV(userPrincipal), uintCV(noteId)],
      network,
      senderAddress: contractAddress,
    });

    const jsonResult = cvToJSON(result);
    if (jsonResult.success && jsonResult.value) {
      return {
        content: jsonResult.value.content.value,
        created: parseInt(jsonResult.value.created.value),
      } as Note;
    }
    return null;
  } catch (error) {
    console.error('Error fetching note:', error);
    return null;
  }
};

// Get user's notes (helper to fetch multiple notes)
export const getUserNotes = async (userPrincipal: string, maxNotes: number = 10) => {
  const notes: (Note & { id: number })[] = [];
  
  for (let i = 1; i <= maxNotes; i++) {
    const note = await getNote(userPrincipal, i);
    if (note) {
      notes.push({ ...note, id: i });
    }
  }
  
  return notes.reverse(); // Show newest first
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return userSession.isUserSignedIn();
};

// Get user data
export const getUserData = () => {
  if (!userSession.isUserSignedIn()) {
    return null;
  }
  return userSession.loadUserData();
};
