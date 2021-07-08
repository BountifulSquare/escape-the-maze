class StateManager {
    static START_STATE = 0
    static PLAY_STATE = 1
    static PAUSE_STATE = 2
    static END_STATE = 3

    constructor(canvasEL) {
        this._menuEL = document.getElementById('menu')
        this._menuStateEL = document.getElementById('menu-state')
        this._canvasEL = canvasEL

        this._state = StateManager.START_STATE
        this._lockEvent = new Event('lock')
        this._unlockEvent = new Event('unlock')

        this._menuStateEL.addEventListener('click', e => { this._handleClick(e) })
    }

    _handleClick(e) {
        const id = +e.target.id

        if (id === 0) {

            document.getElementById('temp-bg').remove()
            this._menuStateEL.children[0].classList.add('hidden')
            this._menuStateEL.children[1].classList.remove('hidden')

            this._canvasEL.classList.remove('hidden')
            // only one time event
            const gameStart = new Event('gamestart')
            this._canvasEL.dispatchEvent(gameStart)

            setTimeout(() => {
                this._canvasEL.dispatchEvent(this._lockEvent)
            }, 50)

        } else if (id === 1) {

            this._canvasEL.dispatchEvent(this._lockEvent)
 
        } else if (id === 2) {

            this._state = StateManager.PLAY_STATE
            const gameReset = new Event('gamereset')
            this._canvasEL.dispatchEvent(gameReset)
            this._canvasEL.dispatchEvent(this._lockEvent)
            this._menuStateEL.children[1].classList.remove('hidden')
            this._menuStateEL.children[2].classList.add('hidden')
            
        }
    }

    get State() {
        return this._state
    }

    play() {
        this._state = StateManager.PLAY_STATE
        this._menuEL.classList.add('hidden')
    }

    pause() {
        this._state = StateManager.PAUSE_STATE
        this._menuEL.classList.remove('hidden')
    }

    stop() {
        this._state = StateManager.END_STATE
        this._menuEL.classList.remove('hidden')
        this._menuStateEL.children[1].classList.add('hidden')
        this._menuStateEL.children[2].classList.remove('hidden')
        this._canvasEL.dispatchEvent(this._unlockEvent)
    }
}

export default StateManager