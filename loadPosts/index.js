/*
 * @Author: mumiao 1270865802zl@gmail.com
 * @Date: 2023-04-17 19:48:03
 * @LastEditors: mumiao 1270865802zl@gmail.com
 * @LastEditTime: 2023-04-18 20:03:23
 * @FilePath: /fsm-example/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// render the app helper
const renderApp = (state, data) => {
  const html = render(state, data)
  document.getElementById('root').innerHTML = html
}

// create an FSM object
const fsm = new StateMachine({
  states,
  transitions,
  initial: states.INITIAL,
})

// subscribe to state updates
fsm.subscribe('update', (state, data) =>
  renderApp(state, data))


// helpers to bind button clicks with FSM transitions
const transitionFetch = () =>
  fsm.performTransition('fetch')

const transitionClear = () =>
  fsm.performTransition('clear')

const transitionRetry = () =>
  fsm.performTransition('retry')

const transitionMore = () =>
  fsm.performTransition('loadMore')

const transitionReload = () =>
  fsm.performTransition('reload')


// initial render
renderApp(states.INITIAL)