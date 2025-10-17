
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { InventoryTable } from './components/InventoryTable';
import { ThemeToggle } from './components/ThemeToggle';
import { GITHUB_JSON_URL, MOCK_INVENTORY_DATA } from './constants';
import { InventoryData } from './types';
import { locales, Language } from './locales';

// Polling interval in milliseconds (e.g., 30 seconds)
const POLLING_INTERVAL = 30000;

/**
 * Custom hook to fetch and manage inventory data.
 * It fetches data from a JSON source, polls for updates,
 * and handles loading and error states gracefully.
 * In case of an initial fetch error, it falls back to mock data.
 * It also uses the Page Visibility API to stop polling when the tab is not active.
 * @returns An object containing the inventory data, loading state, any error messages, and the fetch function.
 */
const useInventoryData = () => {
  const [data, setData] = useState<InventoryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isInitialLoad = useRef(true);
  const intervalId = useRef<number | null>(null);

  const fetchData = useCallback(async () => {
    // On subsequent fetches, don't clear data, just the error.
    // This prevents the UI from flashing if a poll fails but we have old data.
    if (!isInitialLoad.current) {
      setError(null);
    }

    try {
      // Add a cache-busting query parameter to ensure fresh data is fetched
      const response = await fetch(`${GITHUB_JSON_URL}?t=${new Date().getTime()}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const jsonData = await response.json();
      setData(jsonData);
      setError(null); // Clear error on successful fetch
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
      setError(errorMessage);
      // Load mock data on the initial error so the app is still usable for development
      if (isInitialLoad.current) {
        setData(MOCK_INVENTORY_DATA);
      }
      console.error("Failed to fetch inventory data, loading mock data instead.", e);
    } finally {
      if (isInitialLoad.current) {
        setLoading(false);
        isInitialLoad.current = false;
      }
    }
  }, []);

  const startPolling = useCallback(() => {
    // Clear any existing interval before starting a new one
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    intervalId.current = window.setInterval(fetchData, POLLING_INTERVAL);
  }, [fetchData]);

  const stopPolling = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchData();

    // Start polling immediately
    startPolling();

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // When tab becomes visible again, fetch immediately and restart polling
        fetchData();
        startPolling();
      } else {
        // Stop polling when tab is hidden
        stopPolling();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup on component unmount
    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [fetchData, startPolling]);

  return { data, loading, error, fetchData };
};

/**
 * Custom hook to manage the application's theme (light/dark).
 * It persists the theme in localStorage and detects user's system preference.
 * @returns An object containing the current theme and a function to toggle it.
 */
const useTheme = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedPrefs = window.localStorage.getItem('theme');
            if (storedPrefs) {
                return storedPrefs as 'light' | 'dark';
            }
            const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
            if (userMedia.matches) {
                return 'dark';
            }
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    
    return { theme, toggleTheme };
};

/**
 * The main application component.
 * It orchestrates data fetching, theme management, and renders the primary UI layout,
 * including the header, inventory table, and footer.
 * @returns The root JSX element for the application.
 */
const App: React.FC = () => {
  const { data, loading, error } = useInventoryData();
  const { theme, toggleTheme } = useTheme();
  const language: Language = 'ja';

  useEffect(() => {
    document.title = locales.pageTitle[language];
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col items-center p-4 sm:p-6 md:p-8 transition-colors duration-300">
      <header className="w-full max-w-7xl mb-8">
        <div className="flex justify-between items-center">
            <div className="flex items-baseline space-x-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                {locales.headerTitle[language]}
                </h1>
                {data && <p className="text-base text-gray-500 dark:text-gray-400 whitespace-nowrap">{locales.lastUpdated[language]}: {data.lastUpdated}</p>}
            </div>
            <div className="flex items-center space-x-2">
                <ThemeToggle 
                  theme={theme} 
                  toggleTheme={toggleTheme} 
                  labels={{ light: locales.themeToggle.light[language], dark: locales.themeToggle.dark[language] }}
                />
            </div>
        </div>
      </header>

      <main className="w-full max-w-7xl">
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
        {error && !data && <p className="text-center text-red-500">{`Error: ${error}`}</p>}
        {data && !loading && <InventoryTable data={data} language={language} />}
        {data && !loading && (
            <div className="mt-8 text-center max-w-5xl mx-auto space-y-3">
                <p className="text-base text-gray-500 dark:text-gray-400">
                ※販売状況の反映にはお時間がかかる場合もございますので、予めご了承ください。
                </p>
            </div>
        )}
      </main>

      <footer className="w-full max-w-7xl pt-6 border-t border-gray-200 dark:border-gray-700 mt-8 transition-colors duration-300">
        <div className="flex justify-start items-center">
            <button
                onClick={() => window.history.back()}
                className="flex items-center space-x-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
                aria-label={locales.goBack[language]}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>{locales.goBack[language]}</span>
            </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
