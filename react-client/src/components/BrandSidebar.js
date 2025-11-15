import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import BrandService from "../services/BrandService";

export default function BrandSidebar({ onSelect, selected }) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    BrandService.getAll().then((res) => {
      const data = res.data || res || [];
      setBrands(data);
    });
  }, []);

  return (
    <aside className="w-full md:w-64 border-r border-gray-300 pr-4">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-300">
        <Icon icon="mdi:paw" width="22" className="text-blue-700" />
        <h4 className="text-base font-semibold text-gray-800 uppercase tracking-wide">
          Thương hiệu
        </h4>
      </div>

      <ul className="flex flex-col divide-y divide-gray-200 mb-2">
        {brands.map((b) => (
          <li
            key={b.id}
            className={`flex items-center gap-2 px-2 py-2 text-sm cursor-pointer transition
              ${selected === b.id ? "bg-blue-100 text-blue-700" : "hover:text-blue-700 text-gray-800"}`}
            onClick={() => onSelect(b.id)}
          >
            <Icon icon="mdi:paw" width="16" className="text-gray-500" />
            {b.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}
