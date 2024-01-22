import Logo from "../assets/logo.png";

export const Header = () => {
  return (
    <header className="header flex items-center justify-center bg-purple-200">
      <img src={Logo.src} alt="Logo" />
    </header>
  )
}