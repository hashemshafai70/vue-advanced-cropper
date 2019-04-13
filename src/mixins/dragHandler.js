export default {
  created() {
    window.addEventListener('mouseup', this.onMouseUp, { passive: false })
    window.addEventListener('mousemove', this.onMouseMove, { passive: false })
    window.addEventListener('touchmove', this.onTouchMove, { passive: false })
    window.addEventListener('touchend', this.onTouchEnd, { passive: false })
  },
  destroyed() {
    window.removeEventListener('mouseup', this.onMouseUp)
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('touchmove', this.onTouchMove)
    window.removeEventListener('touchend', this.onTouchEnd)
  },
  mounted() {
    if (!this.$refs.handler) {
      throw new Error(
        'You should add ref "handler" to your root handler component to use dragHandler mixin'
      )
    }
    this.touches = []
    this.draggingAnchor = []
  },
  methods: {
    onTouchStart(e) {
      this.touches = [...e.touches]

      if (e.touches.length) {
        this.initAnchor(
          this.touches.reduce(
            (mean, touch) => {
              return {
                clientX: mean.clientX + touch.clientX / e.touches.length,
                clientY: mean.clientY + touch.clientY / e.touches.length
              }
            },
            { clientX: 0, clientY: 0 }
          )
        )
      }
      e.preventDefault()
      e.stopPropagation()
    },
    onTouchEnd(e) {
      this.processEnd()
    },
    onTouchMove(e) {
      if (this.touches.length) {
        this.processMove(e.touches)
        if (e.preventDefault) {
          e.preventDefault()
        }
        if (e.stopPropagation) {
          e.stopPropagation()
        }
      }
    },
    onMouseDown(e) {
      const touch = {
        fake: true,
        clientX: e.clientX,
        clientY: e.clientY
      }
      this.touches = [touch]
      this.initAnchor(touch)
      e.stopPropagation()
    },
    onMouseMove(e) {
      if (this.touches.length) {
        this.processMove([
          {
            fake: true,
            clientX: e.clientX,
            clientY: e.clientY
          }
        ])
        if (e.preventDefault) {
          e.preventDefault()
        }
      }
    },
    onMouseUp(e) {
      this.touches = []
    },
    initAnchor(touch) {
      const handler = this.$refs.handler
      const { left, top } = handler.getBoundingClientRect()

      this.anchor = {
        x: touch.clientX - left,
        y: touch.clientY - top
      }
    },
    processMove(touches) {
      const newTouches = [...touches]
      if (this.touches.length) {
        if (this.touches.length === 1 && newTouches.length === 1) {
          this.$emit('move', {
            x: this.touches[0].clientX - newTouches[0].clientX,
            y: this.touches[0].clientY - newTouches[0].clientY
          })
        }

        this.touches = newTouches
      }
    },
    processEnd() {
      this.touches = []
    }
  }
}
