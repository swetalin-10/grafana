import { act, render, screen } from '@testing-library/react';

import { DashboardScene } from '../DashboardScene';
import { AutoGridLayoutManager } from '../layout-auto-grid/AutoGridLayoutManager';

import { RowItem } from './RowItem';
import { RowsLayoutManager } from './RowsLayoutManager';

jest.mock('@hello-pangea/dnd', () => ({
  Draggable: ({
    children,
  }: {
    children: (
      provided: { innerRef: jest.Mock; draggableProps: object; dragHandleProps: object },
      snapshot: { isDragging: boolean }
    ) => React.ReactNode;
  }) => children({ innerRef: jest.fn(), draggableProps: {}, dragHandleProps: {} }, { isDragging: false }),
}));

jest.mock('@openfeature/react-sdk', () => ({
  useBooleanFlagValue: jest.fn().mockReturnValue(false),
}));

function buildRow(collapse: boolean) {
  const row = new RowItem({
    title: 'Test Row',
    collapse,
    layout: AutoGridLayoutManager.createEmpty(),
  });
  new DashboardScene({ body: new RowsLayoutManager({ rows: [row] }) });
  return row;
}

describe('RowItemRenderer', () => {
  it('sets aria-expanded to false on the toggle button when the row is collapsed', () => {
    const row = buildRow(true);
    render(<row.Component model={row} />);

    expect(screen.getByRole('button', { name: /expand row/i })).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-expanded to true on the toggle button when the row is expanded', () => {
    const row = buildRow(false);
    render(<row.Component model={row} />);

    expect(screen.getByRole('button', { name: /collapse row/i })).toHaveAttribute('aria-expanded', 'true');
  });

  it('flips aria-expanded when the toggle button is clicked', async () => {
    const row = buildRow(true);
    render(<row.Component model={row} />);

    const button = screen.getByRole('button', { name: /expand row/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await act(async () => {
      button.click();
    });

    expect(screen.getByRole('button', { name: /collapse row/i })).toHaveAttribute('aria-expanded', 'true');
  });
});
