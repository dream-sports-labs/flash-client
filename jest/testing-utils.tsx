import React from 'react'

import renderer from 'react-test-renderer'

import {
  render as RNTLRender,
  renderHook as RNTLRenderHook,
  RenderHookOptions,
  RenderHookResult,
  RenderOptions,
} from '@testing-library/react-native'

export { renderer }

export type RenderType = ReturnType<typeof render>

export function render<Props = any>(
  component: React.ReactElement<Props>,
  options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof RNTLRender> {
  return RNTLRender(component, {
    ...options,
    // wrapper: renderHookWrapperWithNavigation,
  })
}

export function renderHook<Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>
): RenderHookResult<Result, Props> {
  const newOptions = {
    ...options,
    // wrapper: renderHookWrapperWithNavigation,
  } as unknown as RenderHookOptions<Props>

  return RNTLRenderHook(renderCallback, newOptions)
}

export {
  act,
  cleanup,
  configure,
  fireEvent,
  getDefaultNormalizer,
  getQueriesForElement,
  isHiddenFromAccessibility,
  isInaccessible,
  resetToDefaults,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react-native'
