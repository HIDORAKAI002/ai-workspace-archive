import React, { useState, useCallback, useEffect } from 'react';
import { 
  AppState, 
  FlowiseFlow, 
  ConversionOptions, 
  ConversionResult, 
  TestResult,
  RecentConversion,
  Notification 
} from '../types';
import { Dashboard } from './Dashboard';
import { FlowViewer } from './FlowViewer';
import { ConversionWorkspace } from './ConversionWorkspace';
import { TestingInterface } from './TestingInterface';
import { NotificationProvider } from './NotificationProvider';
import { useFlowiseConverter } from '../hooks/useFlowiseConverter';
import { useLocalStorage } from '../hooks/useLocalStorage';
import './App.css';

const initialConversionOptions: ConversionOptions = {
  inputPath: '',
  outputPath: './output',
  withLangfuse: false,
  flowiseVersion: '1.0.0',
  selfTest: false,
  overwrite: false,
  format: 'typescript',
  target: 'node',
  includeTests: true,
  includeDocs: true,
};

export const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>({
    currentFlow: null,
    conversionOptions: initialConversionOptions,
    lastConversionResult: null,
    recentConversions: [],
    isConverting: false,
    isTesting: false,
    isValidating: false,
  });

  const [currentView, setCurrentView] = useState<'dashboard' | 'viewer' | 'workspace' | 'testing'>('dashboard');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Custom hooks
  const { 
    validateFlow, 
    convertFlow, 
    testConversion, 
    loadFlowFromFile 
  } = useFlowiseConverter();
  
  const [storedRecentConversions, setStoredRecentConversions] = useLocalStorage<RecentConversion[]>('recent-conversions', []);

  // Initialize recent conversions from localStorage
  useEffect(() => {
    setAppState(prev => ({
      ...prev,
      recentConversions: storedRecentConversions
    }));
  }, [storedRecentConversions]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { ...notification, id }]);
    
    // Auto-remove after duration
    if (notification.duration !== 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, notification.duration || 5000);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const handleFileUpload = useCallback(async (file: File) => {
    try {
      setAppState(prev => ({ ...prev, isValidating: true }));
      
      const flow = await loadFlowFromFile(file);
      const validationResult = await validateFlow(flow);
      
      if (validationResult.isValid) {
        setAppState(prev => ({ ...prev, currentFlow: flow }));
        setCurrentView('viewer');
        
        addNotification({
          type: 'success',
          title: 'Flow Loaded Successfully',
          message: `Loaded ${flow.name} with ${flow.nodes.length} nodes`,
        });
      } else {
        addNotification({
          type: 'error',
          title: 'Invalid Flow',
          message: `Flow validation failed: ${validationResult.errors.map(e => e.message).join(', ')}`,
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Failed to Load Flow',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setAppState(prev => ({ ...prev, isValidating: false }));
    }
  }, [loadFlowFromFile, validateFlow, addNotification]);

  const handleConvert = useCallback(async () => {
    if (!appState.currentFlow) return;

    try {
      setAppState(prev => ({ ...prev, isConverting: true }));
      
      const result = await convertFlow(appState.currentFlow, appState.conversionOptions);
      
      if (result.success) {
        const recentConversion: RecentConversion = {
          id: Date.now().toString(),
          name: appState.currentFlow.name,
          createdAt: new Date().toISOString(),
          status: 'success',
          format: appState.conversionOptions.format,
          nodeCount: appState.currentFlow.nodes.length,
          filesGenerated: result.filesGenerated.length,
        };
        
        const updatedRecentConversions = [recentConversion, ...appState.recentConversions.slice(0, 9)];
        setStoredRecentConversions(updatedRecentConversions);
        
        setAppState(prev => ({
          ...prev,
          lastConversionResult: result,
          recentConversions: updatedRecentConversions,
        }));
        
        addNotification({
          type: 'success',
          title: 'Conversion Successful',
          message: `Generated ${result.filesGenerated.length} files`,
          actions: [
            {
              label: 'View Testing',
              handler: () => setCurrentView('testing'),
            },
          ],
        });
      } else {
        addNotification({
          type: 'error',
          title: 'Conversion Failed',
          message: result.errors.join(', '),
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Conversion Error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setAppState(prev => ({ ...prev, isConverting: false }));
    }
  }, [appState.currentFlow, appState.conversionOptions, appState.recentConversions, convertFlow, addNotification, setStoredRecentConversions]);

  const handleRunTest = useCallback(async (testType: 'unit' | 'integration' | 'e2e' | 'all') => {
    if (!appState.currentFlow || !appState.lastConversionResult) return;

    try {
      setAppState(prev => ({ ...prev, isTesting: true }));
      
      const testResult = await testConversion(appState.currentFlow, appState.lastConversionResult, testType);
      
      setAppState(prev => ({
        ...prev,
        lastConversionResult: prev.lastConversionResult ? {
          ...prev.lastConversionResult,
          testResults: testResult,
        } : null,
      }));
      
      addNotification({
        type: testResult.success ? 'success' : 'warning',
        title: testResult.success ? 'Tests Passed' : 'Some Tests Failed',
        message: `${testResult.passedTests}/${testResult.totalTests} tests passed`,
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Testing Error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setAppState(prev => ({ ...prev, isTesting: false }));
    }
  }, [appState.currentFlow, appState.lastConversionResult, testConversion, addNotification]);

  const handleOptionsChange = useCallback((options: ConversionOptions) => {
    setAppState(prev => ({ ...prev, conversionOptions: options }));
  }, []);

  const handleLoadConversion = useCallback((id: string) => {
    // In a real app, this would load the conversion from storage
    addNotification({
      type: 'info',
      title: 'Load Conversion',
      message: 'Loading previous conversion...',
    });
  }, [addNotification]);

  const handleDeleteConversion = useCallback((id: string) => {
    const updatedRecentConversions = appState.recentConversions.filter(c => c.id !== id);
    setStoredRecentConversions(updatedRecentConversions);
    setAppState(prev => ({ ...prev, recentConversions: updatedRecentConversions }));
    
    addNotification({
      type: 'info',
      title: 'Conversion Deleted',
      message: 'Conversion removed from recent list',
    });
  }, [appState.recentConversions, setStoredRecentConversions, addNotification]);

  const handleNewConversion = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      currentFlow: null,
      lastConversionResult: null,
    }));
    setCurrentView('dashboard');
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            recentConversions={appState.recentConversions}
            onLoadConversion={handleLoadConversion}
            onDeleteConversion={handleDeleteConversion}
            onNewConversion={handleNewConversion}
            onFileUpload={handleFileUpload}
            isLoading={appState.isValidating}
          />
        );
      
      case 'viewer':
        return appState.currentFlow ? (
          <FlowViewer
            flow={appState.currentFlow}
            showValidation={true}
            onNavigateToWorkspace={() => setCurrentView('workspace')}
          />
        ) : null;
      
      case 'workspace':
        return appState.currentFlow ? (
          <ConversionWorkspace
            flow={appState.currentFlow}
            options={appState.conversionOptions}
            onOptionsChange={handleOptionsChange}
            onConvert={handleConvert}
            isConverting={appState.isConverting}
            result={appState.lastConversionResult}
            onNavigateToTesting={() => setCurrentView('testing')}
          />
        ) : null;
      
      case 'testing':
        return appState.currentFlow && appState.lastConversionResult ? (
          <TestingInterface
            flow={appState.currentFlow}
            conversionResult={appState.lastConversionResult}
            onRunTest={handleRunTest}
            isTesting={appState.isTesting}
            testResult={appState.lastConversionResult.testResults}
          />
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <NotificationProvider notifications={notifications} onRemove={removeNotification}>
      <div className="app">
        <header className="app-header">
          <div className="app-nav">
            <h1 className="app-title">Flowise to LangChain</h1>
            <nav className="app-navigation">
              <button 
                className={`nav-button ${currentView === 'dashboard' ? 'active' : ''}`}
                onClick={() => setCurrentView('dashboard')}
              >
                Dashboard
              </button>
              {appState.currentFlow && (
                <>
                  <button 
                    className={`nav-button ${currentView === 'viewer' ? 'active' : ''}`}
                    onClick={() => setCurrentView('viewer')}
                  >
                    Flow Viewer
                  </button>
                  <button 
                    className={`nav-button ${currentView === 'workspace' ? 'active' : ''}`}
                    onClick={() => setCurrentView('workspace')}
                  >
                    Conversion
                  </button>
                  {appState.lastConversionResult && (
                    <button 
                      className={`nav-button ${currentView === 'testing' ? 'active' : ''}`}
                      onClick={() => setCurrentView('testing')}
                    >
                      Testing
                    </button>
                  )}
                </>
              )}
            </nav>
          </div>
        </header>
        
        <main className="app-main">
          {renderCurrentView()}
        </main>
        
        <footer className="app-footer">
          <p>Flowise to LangChain Converter v1.0.2</p>
        </footer>
      </div>
    </NotificationProvider>
  );
};