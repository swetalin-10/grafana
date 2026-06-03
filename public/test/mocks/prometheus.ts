// Mock for @grafana/prometheus — the workspace package has no built artifacts locally.
// This stub provides the minimum shape needed for the test suite to resolve imports.

export const InstantQueryRefIdIndex = 0;
export const isValidLegacyName = jest.fn().mockReturnValue(true);
export const utf8Support = jest.fn().mockReturnValue(true);
export const promqlGrammar = {};
export const getPrometheusTime = jest.fn();
export const PrometheusDatasource = jest.fn();
export const PromCheatSheet = jest.fn().mockReturnValue(null);
export const PromQueryEditorByApp = jest.fn().mockReturnValue(null);
export const AlertingSettingsOverhaul = jest.fn().mockReturnValue(null);
export const PromSettings = jest.fn().mockReturnValue(null);
export const docsTip = jest.fn().mockReturnValue(null);
export const overhaulStyles = jest.fn().mockReturnValue({});

export type PromQuery = {
  expr: string;
  refId: string;
};

export type PromOptions = Record<string, unknown>;
