import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle, Zap, ChevronRight, ArrowRight, Target } from 'lucide-react';

const SmartTaskPlanner = () => {
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [taskPlan, setTaskPlan] = useState(null);
  const [error, setError] = useState('');

  // AI-powered task breakdown logic
  const generateTaskPlan = (goalText) => {
    // Parse goal for timeline indicators
    const timelineMatch = goalText.match(/(\d+)\s*(day|week|month)s?/i);
    const hasDeadline = timelineMatch !== null;
    const timeValue = hasDeadline ? parseInt(timelineMatch[1]) : 4;
    const timeUnit = hasDeadline ? timelineMatch[2].toLowerCase() : 'week';
    
    // Convert to days
    const totalDays = timeUnit === 'month' ? timeValue * 30 : 
                     timeUnit === 'week' ? timeValue * 7 : timeValue;
    
    // Identify goal type and generate appropriate tasks
    const goalLower = goalText.toLowerCase();
    let tasks = [];
    
    if (goalLower.includes('launch') && goalLower.includes('product')) {
      tasks = generateProductLaunchTasks(totalDays);
    } else if (goalLower.includes('learn') || goalLower.includes('study')) {
      tasks = generateLearningTasks(goalText, totalDays);
    } else if (goalLower.includes('website') || goalLower.includes('app')) {
      tasks = generateDevelopmentTasks(totalDays);
    } else if (goalLower.includes('marketing') || goalLower.includes('campaign')) {
      tasks = generateMarketingTasks(totalDays);
    } else if (goalLower.includes('event') || goalLower.includes('conference')) {
      tasks = generateEventTasks(totalDays);
    } else {
      tasks = generateGenericTasks(goalText, totalDays);
    }
    
    return {
      goal: goalText,
      totalDuration: totalDays,
      estimatedCompletion: new Date(Date.now() + totalDays * 24 * 60 * 60 * 1000),
      tasks: tasks,
      analysis: generateAnalysis(goalText, totalDays, tasks)
    };
  };

  const generateProductLaunchTasks = (totalDays) => {
    const phases = [
      { phase: 'Planning', percentage: 0.15 },
      { phase: 'Development', percentage: 0.35 },
      { phase: 'Testing', percentage: 0.20 },
      { phase: 'Marketing', percentage: 0.15 },
      { phase: 'Launch', percentage: 0.15 }
    ];
    
    let currentDay = 0;
    const tasks = [];
    
    phases.forEach((phase, idx) => {
      const phaseDays = Math.ceil(totalDays * phase.percentage);
      
      if (phase.phase === 'Planning') {
        tasks.push({
          id: tasks.length + 1,
          title: 'Define product requirements and specifications',
          description: 'Document core features, user stories, and technical requirements',
          phase: phase.phase,
          startDay: currentDay,
          duration: Math.ceil(phaseDays * 0.4),
          dependencies: [],
          priority: 'high',
          effort: 'medium'
        });
        tasks.push({
          id: tasks.length + 1,
          title: 'Create project timeline and milestones',
          description: 'Break down work into sprints and set key deliverable dates',
          phase: phase.phase,
          startDay: currentDay + Math.ceil(phaseDays * 0.4),
          duration: Math.ceil(phaseDays * 0.3),
          dependencies: [tasks.length],
          priority: 'high',
          effort: 'low'
        });
        tasks.push({
          id: tasks.length + 1,
          title: 'Assemble team and assign roles',
          description: 'Identify stakeholders, assign responsibilities, set up communication channels',
          phase: phase.phase,
          startDay: currentDay + Math.ceil(phaseDays * 0.7),
          duration: Math.ceil(phaseDays * 0.3),
          dependencies: [tasks.length],
          priority: 'medium',
          effort: 'low'
        });
      } else if (phase.phase === 'Development') {
        tasks.push({
          id: tasks.length + 1,
          title: 'Set up development environment and architecture',
          description: 'Configure repositories, CI/CD pipelines, and development tools',
          phase: phase.phase,
          startDay: currentDay,
          duration: Math.ceil(phaseDays * 0.15),
          dependencies: [tasks.length - 1],
          priority: 'high',
          effort: 'medium'
        });
        tasks.push({
          id: tasks.length + 1,
          title: 'Develop core features (MVP)',
          description: 'Build essential functionality for minimum viable product',
          phase: phase.phase,
          startDay: currentDay + Math.ceil(phaseDays * 0.15),
          duration: Math.ceil(phaseDays * 0.5),
          dependencies: [tasks.length],
          priority: 'high',
          effort: 'high'
        });
        tasks.push({
          id: tasks.length + 1,
          title: 'Implement secondary features',
          description: 'Add nice-to-have features and polish user experience',
          phase: phase.phase,
          startDay: currentDay + Math.ceil(phaseDays * 0.65),
          duration: Math.ceil(phaseDays * 0.35),
          dependencies: [tasks.length],
          priority: 'medium',
          effort: 'high'
        });
      } else if (phase.phase === 'Testing') {
        tasks.push({
          id: tasks.length + 1,
          title: 'Conduct internal testing and QA',
          description: 'Run unit tests, integration tests, and manual QA checks',
          phase: phase.phase,
          startDay: currentDay,
          duration: Math.ceil(phaseDays * 0.4),
          dependencies: [tasks.length],
          priority: 'high',
          effort: 'medium'
        });
        tasks.push({
          id: tasks.length + 1,
          title: 'Beta testing with select users',
          description: 'Gather feedback from early adopters and fix critical issues',
          phase: phase.phase,
          startDay: currentDay + Math.ceil(phaseDays * 0.4),
          duration: Math.ceil(phaseDays * 0.4),
          dependencies: [tasks.length],
          priority: 'high',
          effort: 'medium'
        });
        tasks.push({
          id: tasks.length + 1,
          title: 'Performance optimization and bug fixes',
          description: 'Address feedback, optimize performance, ensure stability',
          phase: phase.phase,
          startDay: currentDay + Math.ceil(phaseDays * 0.8),
          duration: Math.ceil(phaseDays * 0.2),
          dependencies: [tasks.length],
          priority: 'high',
          effort: 'medium'
        });
      } else if (phase.phase === 'Marketing') {
        tasks.push({
          id: tasks.length + 1,
          title: 'Create marketing materials and content',
          description: 'Design landing page, write copy, create demo videos',
          phase: phase.phase,
          startDay: currentDay,
          duration: Math.ceil(phaseDays * 0.5),
          dependencies: [tasks.length - 5],
          priority: 'medium',
          effort: 'medium'
        });
        tasks.push({
          id: tasks.length + 1,
          title: 'Set up analytics and tracking',
          description: 'Configure analytics tools, set up conversion funnels',
          phase: phase.phase,
          startDay: currentDay + Math.ceil(phaseDays * 0.5),
          duration: Math.ceil(phaseDays * 0.25),
          dependencies: [tasks.length],
          priority: 'medium',
          effort: 'low'
        });
        tasks.push({
          id: tasks.length + 1,
          title: 'Build pre-launch buzz',
          description: 'Reach out to communities, create teaser content, line up early users',
          phase: phase.phase,
          startDay: currentDay + Math.ceil(phaseDays * 0.75),
          duration: Math.ceil(phaseDays * 0.25),
          dependencies: [tasks.length - 1],
          priority: 'medium',
          effort: 'low'
        });
      } else if (phase.phase === 'Launch') {
        tasks.push({
          id: tasks.length + 1,
          title: 'Final deployment and go-live',
          description: 'Deploy to production, verify all systems operational',
          phase: phase.phase,
          startDay: currentDay,
          duration: Math.ceil(phaseDays * 0.2),
          dependencies: [tasks.length - 1, tasks.length - 4],
          priority: 'high',
          effort: 'medium'
        });
        tasks.push({
          id: tasks.length + 1,
          title: 'Execute launch campaign',
          description: 'Announce on all channels, engage with early users',
          phase: phase.phase,
          startDay: currentDay + Math.ceil(phaseDays * 0.2),
          duration: Math.ceil(phaseDays * 0.4),
          dependencies: [tasks.length],
          priority: 'high',
          effort: 'medium'
        });
        tasks.push({
          id: tasks.length + 1,
          title: 'Monitor metrics and gather feedback',
          description: 'Track KPIs, respond to users, iterate based on feedback',
          phase: phase.phase,
          startDay: currentDay + Math.ceil(phaseDays * 0.6),
          duration: Math.ceil(phaseDays * 0.4),
          dependencies: [tasks.length],
          priority: 'high',
          effort: 'low'
        });
      }
      
      currentDay += phaseDays;
    });
    
    return tasks;
  };

  const generateLearningTasks = (goalText, totalDays) => {
    const tasks = [];
    const setupDays = Math.ceil(totalDays * 0.1);
    const learningDays = Math.ceil(totalDays * 0.7);
    const practiceDays = Math.ceil(totalDays * 0.2);
    
    tasks.push({
      id: 1,
      title: 'Research and gather learning resources',
      description: 'Find courses, books, tutorials, and practice materials',
      phase: 'Preparation',
      startDay: 0,
      duration: setupDays,
      dependencies: [],
      priority: 'high',
      effort: 'low'
    });
    
    tasks.push({
      id: 2,
      title: 'Create learning schedule and milestones',
      description: 'Break down topics, set daily/weekly learning goals',
      phase: 'Preparation',
      startDay: setupDays,
      duration: Math.ceil(setupDays / 2),
      dependencies: [1],
      priority: 'high',
      effort: 'low'
    });
    
    const learningChunks = 4;
    const chunkDays = Math.ceil(learningDays / learningChunks);
    
    for (let i = 0; i < learningChunks; i++) {
      tasks.push({
        id: tasks.length + 1,
        title: `Study core concepts - Part ${i + 1}`,
        description: `Deep dive into fundamental topics and take notes`,
        phase: 'Learning',
        startDay: setupDays + Math.ceil(setupDays / 2) + (i * chunkDays),
        duration: chunkDays,
        dependencies: [tasks.length],
        priority: 'high',
        effort: 'high'
      });
    }
    
    tasks.push({
      id: tasks.length + 1,
      title: 'Complete practice exercises and projects',
      description: 'Apply learned concepts through hands-on practice',
      phase: 'Application',
      startDay: totalDays - practiceDays,
      duration: practiceDays,
      dependencies: [tasks.length],
      priority: 'high',
      effort: 'high'
    });
    
    return tasks;
  };

  const generateDevelopmentTasks = (totalDays) => {
    const tasks = [];
    
    tasks.push({
      id: 1,
      title: 'Requirements gathering and planning',
      description: 'Define features, user flows, and technical stack',
      phase: 'Planning',
      startDay: 0,
      duration: Math.ceil(totalDays * 0.15),
      dependencies: [],
      priority: 'high',
      effort: 'medium'
    });
    
    tasks.push({
      id: 2,
      title: 'Design UI/UX mockups',
      description: 'Create wireframes and visual designs',
      phase: 'Design',
      startDay: Math.ceil(totalDays * 0.15),
      duration: Math.ceil(totalDays * 0.15),
      dependencies: [1],
      priority: 'high',
      effort: 'medium'
    });
    
    tasks.push({
      id: 3,
      title: 'Set up development environment',
      description: 'Initialize project, configure tools and dependencies',
      phase: 'Development',
      startDay: Math.ceil(totalDays * 0.3),
      duration: Math.ceil(totalDays * 0.05),
      dependencies: [2],
      priority: 'high',
      effort: 'low'
    });
    
    tasks.push({
      id: 4,
      title: 'Implement frontend components',
      description: 'Build UI components and pages',
      phase: 'Development',
      startDay: Math.ceil(totalDays * 0.35),
      duration: Math.ceil(totalDays * 0.25),
      dependencies: [3],
      priority: 'high',
      effort: 'high'
    });
    
    tasks.push({
      id: 5,
      title: 'Develop backend API and database',
      description: 'Create endpoints, models, and business logic',
      phase: 'Development',
      startDay: Math.ceil(totalDays * 0.35),
      duration: Math.ceil(totalDays * 0.25),
      dependencies: [3],
      priority: 'high',
      effort: 'high'
    });
    
    tasks.push({
      id: 6,
      title: 'Testing and bug fixes',
      description: 'Test all features, fix issues, ensure quality',
      phase: 'Testing',
      startDay: Math.ceil(totalDays * 0.6),
      duration: Math.ceil(totalDays * 0.2),
      dependencies: [4, 5],
      priority: 'high',
      effort: 'medium'
    });
    
    tasks.push({
      id: 7,
      title: 'Deployment and launch',
      description: 'Deploy to production, configure hosting',
      phase: 'Launch',
      startDay: Math.ceil(totalDays * 0.8),
      duration: Math.ceil(totalDays * 0.2),
      dependencies: [6],
      priority: 'high',
      effort: 'medium'
    });
    
    return tasks;
  };

  const generateMarketingTasks = (totalDays) => {
    return [
      {
        id: 1,
        title: 'Define target audience and positioning',
        description: 'Research audience, create buyer personas, craft messaging',
        phase: 'Strategy',
        startDay: 0,
        duration: Math.ceil(totalDays * 0.2),
        dependencies: [],
        priority: 'high',
        effort: 'medium'
      },
      {
        id: 2,
        title: 'Create content calendar and assets',
        description: 'Plan posts, create graphics, write copy',
        phase: 'Content',
        startDay: Math.ceil(totalDays * 0.2),
        duration: Math.ceil(totalDays * 0.3),
        dependencies: [1],
        priority: 'high',
        effort: 'high'
      },
      {
        id: 3,
        title: 'Set up campaigns and tracking',
        description: 'Configure ads, email sequences, analytics',
        phase: 'Setup',
        startDay: Math.ceil(totalDays * 0.5),
        duration: Math.ceil(totalDays * 0.2),
        dependencies: [2],
        priority: 'high',
        effort: 'medium'
      },
      {
        id: 4,
        title: 'Launch and monitor campaigns',
        description: 'Go live, track metrics, optimize performance',
        phase: 'Execution',
        startDay: Math.ceil(totalDays * 0.7),
        duration: Math.ceil(totalDays * 0.3),
        dependencies: [3],
        priority: 'high',
        effort: 'medium'
      }
    ];
  };

  const generateEventTasks = (totalDays) => {
    return [
      {
        id: 1,
        title: 'Define event scope and objectives',
        description: 'Set goals, budget, target attendance, format',
        phase: 'Planning',
        startDay: 0,
        duration: Math.ceil(totalDays * 0.15),
        dependencies: [],
        priority: 'high',
        effort: 'medium'
      },
      {
        id: 2,
        title: 'Secure venue and vendors',
        description: 'Book location, catering, AV equipment, suppliers',
        phase: 'Logistics',
        startDay: Math.ceil(totalDays * 0.15),
        duration: Math.ceil(totalDays * 0.25),
        dependencies: [1],
        priority: 'high',
        effort: 'high'
      },
      {
        id: 3,
        title: 'Marketing and promotion',
        description: 'Create website, send invitations, promote event',
        phase: 'Marketing',
        startDay: Math.ceil(totalDays * 0.4),
        duration: Math.ceil(totalDays * 0.3),
        dependencies: [2],
        priority: 'high',
        effort: 'medium'
      },
      {
        id: 4,
        title: 'Finalize details and run event',
        description: 'Confirm RSVPs, prepare materials, execute event day',
        phase: 'Execution',
        startDay: Math.ceil(totalDays * 0.7),
        duration: Math.ceil(totalDays * 0.3),
        dependencies: [3],
        priority: 'high',
        effort: 'high'
      }
    ];
  };

  const generateGenericTasks = (goalText, totalDays) => {
    return [
      {
        id: 1,
        title: 'Research and planning',
        description: 'Gather information, define requirements, create action plan',
        phase: 'Planning',
        startDay: 0,
        duration: Math.ceil(totalDays * 0.2),
        dependencies: [],
        priority: 'high',
        effort: 'medium'
      },
      {
        id: 2,
        title: 'Initial implementation',
        description: 'Start working on core components of the goal',
        phase: 'Execution',
        startDay: Math.ceil(totalDays * 0.2),
        duration: Math.ceil(totalDays * 0.3),
        dependencies: [1],
        priority: 'high',
        effort: 'high'
      },
      {
        id: 3,
        title: 'Refinement and iteration',
        description: 'Improve, adjust based on progress, add finishing touches',
        phase: 'Refinement',
        startDay: Math.ceil(totalDays * 0.5),
        duration: Math.ceil(totalDays * 0.3),
        dependencies: [2],
        priority: 'medium',
        effort: 'medium'
      },
      {
        id: 4,
        title: 'Final review and completion',
        description: 'Quality check, ensure all objectives met, wrap up',
        phase: 'Completion',
        startDay: Math.ceil(totalDays * 0.8),
        duration: Math.ceil(totalDays * 0.2),
        dependencies: [3],
        priority: 'high',
        effort: 'low'
      }
    ];
  };

  const generateAnalysis = (goalText, totalDays, tasks) => {
    const criticalPath = tasks.filter(t => t.priority === 'high');
    const totalEffort = tasks.reduce((sum, t) => {
      const effort = t.effort === 'high' ? 3 : t.effort === 'medium' ? 2 : 1;
      return sum + effort;
    }, 0);
    
    return {
      complexity: totalEffort > 30 ? 'High' : totalEffort > 15 ? 'Medium' : 'Low',
      criticalPathLength: criticalPath.length,
      totalTasks: tasks.length,
      riskFactors: totalDays < 7 ? ['Tight timeline', 'Limited buffer for issues'] : 
                   totalDays < 14 ? ['Moderate timeline pressure'] : 
                   ['Adequate time for quality work'],
      recommendations: [
        'Set up daily standups to track progress',
        'Build in 20% buffer time for unexpected issues',
        'Prioritize tasks on the critical path',
        'Consider parallel execution where possible'
      ]
    };
  };

  // Add near top of file (helpers)
  const normalizePlanFromBackend = (raw) => {
    if (!raw || typeof raw !== 'object') return null;

    // clone shallow
    const plan = { ...raw };

    // totalDuration: ensure number
    plan.totalDuration = Number(plan.totalDuration) || (plan.tasks ? plan.tasks.reduce((s, t) => s + (t.duration||0), 0) : 0);

    // estimatedCompletion: convert to Date object if string
    if (plan.estimatedCompletion) {
      const parsed = new Date(plan.estimatedCompletion);
      plan.estimatedCompletion = isNaN(parsed) ? new Date(Date.now() + (plan.totalDuration || 0) * 24*60*60*1000) : parsed;
    } else {
      plan.estimatedCompletion = new Date(Date.now() + (plan.totalDuration || 0) * 24*60*60*1000);
    }

    // Ensure tasks exists and normalize each task
    plan.tasks = Array.isArray(plan.tasks) ? plan.tasks.map((t, idx) => {
      const task = { ...t };
      task.id = Number(task.id ?? (idx+1));
      task.startDay = Number(task.startDay ?? 0);
      task.duration = Math.max(1, Number(task.duration ?? 1));
      task.dependencies = Array.isArray(task.dependencies) ? task.dependencies.map(d => Number(d)) : [];
      task.priority = (task.priority || 'medium').toLowerCase();
      task.effort = (task.effort || 'medium').toLowerCase();
      task.title = task.title || `Task ${task.id}`;
      task.description = task.description || '';
      task.phase = task.phase || 'General';
      return task;
    }) : [];

    // analysis: ensure structure
    plan.analysis = plan.analysis || {};
    plan.analysis.totalTasks = Number(plan.analysis.totalTasks ?? plan.tasks.length);
    plan.analysis.complexity = plan.analysis.complexity || 'Medium';
    plan.analysis.riskFactors = Array.isArray(plan.analysis.riskFactors) ? plan.analysis.riskFactors : [];
    plan.analysis.recommendations = Array.isArray(plan.analysis.recommendations) ? plan.analysis.recommendations : [];

    return plan;
  };


  const handleGeneratePlan = async () => {
    if (!goal.trim()) {
      setError('Please enter a goal to plan');
      return;
    }

    setError('');
    setLoading(true);

    // Optional: AbortController if you want to cancel long calls
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const res = await fetch('http://localhost:8000/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal }),
        signal,
      });

      // If backend returns non-JSON error, catch it
      let data;
      try {
        data = await res.json();
      } catch (e) {
        throw new Error('Invalid JSON response from backend');
      }

      if (!res.ok) {
        const msg = data.detail || data.error || data.message || 'Failed to generate plan';
        throw new Error(msg);
      }

      // Normalize the response to the UI shape
      const normalized = normalizePlanFromBackend(data);
      if (!normalized) throw new Error('Plan normalization failed');

      setTaskPlan(normalized);
    } catch (err) {
      console.error('Plan generation error:', err);
      // If you want a fallback deterministic plan, call generateTaskPlan(goal) here:
      // const fallback = generateTaskPlan(goal); setTaskPlan(fallback);
      setError(err.message || 'Backend not reachable or failed to respond');
      setTaskPlan(null);
    } finally {
      setLoading(false);
    }
  };


  const formatDate = (startDay, duration) => {
    const start = new Date(Date.now() + startDay * 24 * 60 * 60 * 1000);
    const end = new Date(Date.now() + (startDay + duration) * 24 * 60 * 60 * 1000);
    return {
      start: start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      end: end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  };

  const getPriorityColor = (priority) => {
    return priority === 'high' ? 'text-red-600 bg-red-50' :
           priority === 'medium' ? 'text-yellow-600 bg-yellow-50' :
           'text-green-600 bg-green-50';
  };

  const getEffortColor = (effort) => {
    return effort === 'high' ? 'text-purple-600 bg-purple-50' :
           effort === 'medium' ? 'text-blue-600 bg-blue-50' :
           'text-gray-600 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Target className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Smart Task Planner
            </h1>
          </div>
          <p className="text-gray-600">AI-powered goal breakdown with timelines and dependencies</p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            What's your goal?
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGeneratePlan()}
              placeholder="e.g., Launch a product in 2 weeks, Learn Python in 30 days..."
              className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
            />
            <button
              onClick={handleGeneratePlan}
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5" />
                  Generate Plan
                </>
              )}
            </button>
          </div>
          {error && (
            <p className="text-red-600 text-sm mt-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {error}
            </p>
          )}
        </div>

        {/* Results Section */}
        {taskPlan && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Total Tasks</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{taskPlan.analysis.totalTasks}</p>
              </div>
              
              <div className="bg-white rounded-xl shadow p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Duration</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{taskPlan.totalDuration} days</p>
              </div>
              
              <div className="bg-white rounded-xl shadow p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Complexity</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{taskPlan.analysis.complexity}</p>
              </div>
              
              <div className="bg-white rounded-xl shadow p-4">
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-medium">Completion</span>
                </div>
                <p className="text-sm font-bold text-gray-900">
                  {taskPlan.estimatedCompletion.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            {/* Analysis */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-indigo-600" />
                AI Analysis
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Risk Factors</h4>
                  <ul className="space-y-1">
                    {taskPlan.analysis.riskFactors.map((risk, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-yellow-500 mt-0.5">▸</span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Recommendations</h4>
                  <ul className="space-y-1">
                    {taskPlan.analysis.recommendations.slice(0, 2).map((rec, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Task Timeline */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Task Breakdown
              </h3>
              
              <div className="space-y-4">
                {taskPlan.tasks.map((task, idx) => {
                  const dates = formatDate(task.startDay, task.duration);
                  const prevPhase = idx > 0 ? taskPlan.tasks[idx - 1].phase : null;
                  const showPhaseHeader = task.phase !== prevPhase;
                  
                  return (
                    <div key={task.id}>
                      {showPhaseHeader && (
                        <div className="flex items-center gap-2 mt-6 mb-3">
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider px-3 py-1 bg-indigo-50 rounded-full">
                            {task.phase}
                          </span>
                          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
                        </div>
                      )}
                      
                      <div className="group hover:bg-gray-50 rounded-xl p-4 transition-colors border-2 border-gray-100">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-2">
                              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                                {task.id}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
                                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                                
                                <div className="flex flex-wrap gap-2">
                                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                    {task.priority.toUpperCase()} Priority
                                  </span>
                                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getEffortColor(task.effort)}`}>
                                    {task.effort.toUpperCase()} Effort
                                  </span>
                                  <span className="px-2 py-1 rounded-md text-xs font-medium text-blue-700 bg-blue-50 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {task.duration} {task.duration === 1 ? 'day' : 'days'}
                                  </span>
                                  {task.dependencies.length > 0 && (
                                    <span className="px-2 py-1 rounded-md text-xs font-medium text-gray-700 bg-gray-100 flex items-center gap-1">
                                      <ArrowRight className="w-3 h-3" />
                                      Depends on #{task.dependencies.join(', #')}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right flex-shrink-0">
                            <div className="text-xs text-gray-500 mb-1">Timeline</div>
                            <div className="text-sm font-semibold text-gray-900">{dates.start}</div>
                            <div className="text-xs text-gray-400 flex items-center gap-1 justify-end">
                              <ChevronRight className="w-3 h-3" />
                              {dates.end}
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="mt-3 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300 w-0 group-hover:w-0"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Execution Tips</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Start with Planning</h4>
                    <p className="text-sm text-gray-600">Don't skip the planning phase. A solid foundation prevents costly mistakes later.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Track Dependencies</h4>
                    <p className="text-sm text-gray-600">Tasks with dependencies can't start until prerequisites are complete.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Prioritize Critical Path</h4>
                    <p className="text-sm text-gray-600">Focus on high-priority tasks that directly impact your timeline.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Build in Buffer Time</h4>
                    <p className="text-sm text-gray-600">Add 20% extra time to account for unexpected challenges and delays.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Example Goals */}
        {!taskPlan && !loading && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Try these examples:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'Launch a product in 2 weeks',
                'Learn Python in 30 days',
                'Build a website in 10 days',
                'Plan a marketing campaign in 3 weeks',
                'Organize a conference in 2 months',
                'Create a mobile app in 45 days'
              ].map((example, idx) => (
                <button
                  key={idx}
                  onClick={() => setGoal(example)}
                  className="text-left px-4 py-3 bg-gray-50 hover:bg-indigo-50 rounded-lg transition-colors border border-gray-200 hover:border-indigo-300 group"
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600" />
                    <span className="text-sm text-gray-700 group-hover:text-indigo-900">{example}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartTaskPlanner;