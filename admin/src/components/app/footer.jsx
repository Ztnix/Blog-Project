export default function Footer() {
  return (
    <div className="footer flex justify-center py-8 px-12 bg-[#282429] text-white border-t border-gray-600">
      <div className="footerContainer w-fit flex flex-col text-[1.2rem]">
        <p className="border-b border-gray-600 pb-2">Ztnix© 2025</p>
        <div className="footerLinks flex gap-3 pt-2 justify-center">
          <p>X</p>
          <p>Y</p>
          <p>Z</p>
        </div>
      </div>
    </div>
  );
}
