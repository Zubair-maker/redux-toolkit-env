import React, { useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import CareerSite from './pages/settings/career-site/CareerSite';
import Departments from './pages/settings/institute/Departments';
import Designations from './pages/settings/institute/Designations';
import Addresses from './pages/settings/institute/Addresses';
import Degrees from './pages/settings/institute/Degrees';
import List from './pages/settings/users/List';
import Approvals from './pages/settings/users/Approvals';
import Stages from './pages/settings/hiring-pipeline/Stages';
import Pipelines from './pages/settings/hiring-pipeline/Pipelines';
import Categories from './pages/settings/email-templates/Categories';
import Templates from './pages/settings/email-templates/Templates';
import Fields from './pages/settings/candidate-settings/Fields';
import Webforms from './pages/settings/candidate-settings/Webforms';
import AssessmentCategories from './pages/settings/candidate-settings/AssessmentCategories';
import JobBoards from './pages/settings/job-boards/JobBoards';
import Billing from './pages/settings/billing/Billing';
import Jobs from './pages/main/jobs/Jobs';
import CreateJob from './pages/main/jobs/CreateJob';
import EditJob from './pages/main/jobs/EditJob';
import Candidates from './pages/main/candidates/Candidates';
import CreateCandidate from './pages/main/candidates/CreateCandidate';
import EditCandidate from './pages/main/candidates/EditCandidate';
import Interviews from './pages/main/interviews/Interviews';
import CreateInterview from './pages/main/interviews/CreateInterview';
import EditInterview from './pages/main/interviews/EditInterview';
import Assessments from './pages/main/assessments/Assessments';
import CreateAssessment from './pages/main/assessments/CreateAssessment';

import EditAssessment from './pages/main/assessments/EditAssessment';
import JobPreview from './pages/main/jobs/JobPreview';
import PriviewInterview from './pages/main/interviews/PriviewInterview';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: '/dashboard/jobs', element: <Jobs /> },
        { path: '/dashboard/jobs/create-job', element: <CreateJob /> },
        { path: '/dashboard/jobs/edit-job/:editJobId', element: <CreateJob /> },
        { path: '/dashboard/jobs/job-preview/', element: <JobPreview /> },
        { path: '/dashboard/candidates', element: <Candidates /> },
        { path: '/dashboard/candidates/create-candidate', element: <CreateCandidate /> },
        { path: '/dashboard/candidates/edit-candidate', element: <EditCandidate /> },
        { path: '/dashboard/interviews', element: <Interviews /> },
        { path: '/dashboard/interviews/create-interview', element: <CreateInterview /> },
        { path: '/dashboard/interviews/edit-interview/:editInterview', element: <CreateInterview /> },
        { path: '/dashboard/assessments', element: <Assessments /> },
        { path: '/dashboard/assessments/create-assessment', element: <CreateAssessment /> },
        { path: '/dashboard/assessments/edit-assessment/:assessmentEditId', element: <CreateAssessment /> },
        { path: '/dashboard/career-site', element: <CareerSite /> },
        { path: 'institute-setting/departments', element: <Departments /> },
        { path: 'institute-setting/designations', element: <Designations /> },
        { path: 'institute-setting/addresses', element: <Addresses /> },
        { path: 'institute-setting/degrees', element: <Degrees /> },
        { path: 'users/list', element: <List /> },
        { path: 'users/approvals', element: <Approvals /> },
        { path: 'hiring-pipeline/stages', element: <Stages /> },
        { path: 'hiring-pipeline/pipelines', element: <Pipelines /> },
        { path: 'email-templates/categories', element: <Categories /> },
        { path: 'email-templates/templates', element: <Templates /> },
        { path: 'candidate-settings/fields', element: <Fields /> },
        { path: 'candidate-settings/webforms', element: <Webforms /> },
        { path: 'candidate-settings/assessment-categories', element: <AssessmentCategories /> },
        { path: '/dashboard/job-boards', element: <JobBoards /> },
        { path: '/dashboard/billing', element: <Billing /> },
        { path: '/dashboard/jobs/job-preview', element: <JobPreview /> },
        { path: '/dashboard/interviews/priview-interview', element: <PriviewInterview /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
