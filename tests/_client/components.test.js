import React from 'react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import regeneratorRuntime from 'regenerator-runtime';
import renderer from 'react-test-renderer';

import App from '../../client/components/App.jsx';
