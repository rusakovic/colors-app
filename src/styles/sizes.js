// Small devices (landscape phones, 576px and up)
// Medium devices (tablets, 768px and up)
// Large devices (desktops, 992px and up)
// Extra large devices (large desktops, 1200px and up)

export default {
  up() {

  },
  down(size) {
    const sizes ={
      xs: "576px",
      sm: "768px",
      md: "992px",
      lg: "1200px",
    }
    return `@media (max-width: ${sizes[size]})`
  }
}