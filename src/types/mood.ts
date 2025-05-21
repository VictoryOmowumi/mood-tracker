export type MoodEntry = {
  id: string;
  mood: keyof typeof moods;
  journal: string;
  intensity: number;
  physicalSensations: string[];
  tags: string[];
  updatedAt: string;
  youtubePlaylistId: string;
  createdAt: string;
  userId: string;
};

export type MoodColors = {
  light: {
    primary: string;
    secondary: string;
    text: string;
  };
  dark: {
    primary: string;
    secondary: string;
    text: string;
  };
};
export const moods = {
  happy: {
    emoji: '😊',
    colors: {
      light: {
        primary: 'bg-yellow-400',
        secondary: 'bg-yellow-100',
        text: 'text-yellow-900',
        hex: '#facc15', // yellow-400
      },
      dark: {
        primary: 'bg-amber-600',
        secondary: 'bg-amber-900',
        text: 'text-amber-100',
        hex: '#d97706', // amber-600
      }
    },
    playlistId: 'PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj', // YouTube "Happy Hits"
    fallbackTracks: [
      { title: 'Happy - Pharrell', url: 'https://youtu.be/ZbZSe6N_BXs' }
    ]
  },
  sad: {
    emoji: '😢',
    colors: {
      light: {
        primary: 'bg-blue-400',
        secondary: 'bg-blue-100',
        text: 'text-blue-900',
        hex: '#60a5fa', // blue-400
      },
      dark: {
        primary: 'bg-blue-600',
        secondary: 'bg-blue-800',
        text: 'text-blue-100',
        hex: '#2563eb', // blue-600
      }
    },
    playlistId: '37i9dQZF1DX7qK8ma5wgG1'
  },
  angry: {
    emoji: '😠',
    colors: {
      light: {
        primary: 'bg-red-400',
        secondary: 'bg-red-100',
        text: 'text-red-900',
        hex: '#f87171', // red-400
      },
      dark: {
        primary: 'bg-red-600',
        secondary: 'bg-red-800',
        text: 'text-red-100',
        hex: '#dc2626', // red-600
      }
    },
    playlistId: '37i9dQZF1DX1tyCD9QhIWF'
  },
  anxious: {
    emoji: '😰',
    colors: {
      light: {
        primary: 'bg-purple-400',
        secondary: 'bg-purple-100',
        text: 'text-purple-900',
        hex: '#a78bfa', // purple-400
      },
      dark: {
        primary: 'bg-purple-600',
        secondary: 'bg-purple-800',
        text: 'text-purple-100',
        hex: '#7c3aed', // purple-600
      }
    },
    playlistId: '37i9dQZF1DX3YSRoSdA634'
  },
  excited: {
    emoji: '🤩',
    colors: {
      light: {
        primary: 'bg-pink-400',
        secondary: 'bg-pink-100',
        text: 'text-pink-900',
        hex: '#f472b6', // pink-400
      },
      dark: {
        primary: 'bg-pink-600',
        secondary: 'bg-pink-800',
        text: 'text-pink-100',
        hex: '#db2777', // pink-600
      }
    },
    playlistId: '37i9dQZF1DX1s9knjP51Oa'
  },
  calm: {
    emoji: '😌',
    colors: {
      light: {
        primary: 'bg-green-300',
        secondary: 'bg-green-100',
        text: 'text-green-900',
        hex: '#6ee7b7', // green-300
      },
      dark: {
        primary: 'bg-green-600',
        secondary: 'bg-green-800',
        text: 'text-green-100',
        hex: '#16a34a', // green-600
      }
    },
    playlistId: '37i9dQZF1DX4sWSpwq3LiO'
  },
  tired: {
    emoji: '🥱',
    colors: {
      light: {
        primary: 'bg-gray-400',
        secondary: 'bg-gray-100',
        text: 'text-gray-900',
        hex: '#9ca3af', // gray-400
      },
      dark: {
        primary: 'bg-gray-600',
        secondary: 'bg-gray-800',
        text: 'text-gray-100',
        hex: '#4b5563', // gray-600
      }
    },
    playlistId: '37i9dQZF1DX3YSRoSdA634'
  },
  grateful: {
    emoji: '🙏',
    colors: {
      light: {
        primary: 'bg-orange-300',
        secondary: 'bg-orange-100',
        text: 'text-orange-900',
        hex: '#fdba74', // orange-300
      },
      dark: {
        primary: 'bg-orange-600',
        secondary: 'bg-orange-800',
        text: 'text-orange-100',
        hex: '#ea580c', // orange-600
      }
    },
    playlistId: '37i9dQZF1DX2sUQwD7tbmL'
  },
  stressed: {
    emoji: '😫',
    colors: {
      light: {
        primary: 'bg-red-300',
        secondary: 'bg-red-100',
        text: 'text-red-900',
        hex: '#fca5a5', // red-300
      },
      dark: {
        primary: 'bg-red-700',
        secondary: 'bg-red-900',
        text: 'text-red-100',
        hex: '#b91c1c', // red-700
      }
    },
    playlistId: '37i9dQZF1DX3rxVfibe1L0'
  },
  neutral: {
    emoji: '😐',
    colors: {
      light: {
        primary: 'bg-gray-300',
        secondary: 'bg-gray-100',
        text: 'text-gray-900',
        hex: '#d1d5db', // gray-300
      },
      dark: {
        primary: 'bg-gray-700',
        secondary: 'bg-gray-900',
        text: 'text-gray-100',
        hex: '#374151', // gray-700
      }
    },
    playlistId: 'PLrpnnfS_2Lb55OLa7eWG7-ZFcK9Yd1g9j&si=rkr3iQVkcD4FDJvK'
  }
} as const;
// https://music.youtube.com/playlist?list=PLrpnnfS_2Lb55OLa7eWG7-ZFcK9Yd1g9j&si=rkr3iQVkcD4FDJvK
// export type Mood = keyof typeof moods;

