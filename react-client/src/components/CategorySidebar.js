import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import CategoryService from "../services/CategoryService";

export default function CategorySidebar({ onSelect, selected }) {
  const [cats, setCats] = useState([]);
  const [openIds, setOpenIds] = useState([]); // lưu danh mục cha đang mở

  useEffect(() => {
    CategoryService.getAll().then((res) => {
      const data = res.data || res || [];
      setCats(data);
    });
  }, []);

  const getChildren = (parentId) =>
    cats.filter((c) => c.parentId === parentId);

  const toggleOpen = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const renderTree = (parentId = null, level = 0) => {
    const children = getChildren(parentId);
    if (children.length === 0) return null;

    return (
      <ul className={`flex flex-col divide-y divide-gray-100`}>
        {children.map((c) => {
          const hasChild = getChildren(c.id).length > 0;
          const isOpen = openIds.includes(c.id);
          const isSelected = selected === c.id;

          return (
            <li key={c.id}>
              <div
                className={`flex items-center gap-2 px-2 py-2 text-sm cursor-pointer transition
                  ${isSelected ? "bg-blue-100 text-blue-700" : "hover:text-blue-700 text-gray-800"}
                  ${level > 0 ? `pl-${level * 3}` : ""}
                `}
                onClick={() => {
                  if (hasChild) toggleOpen(c.id);
                  onSelect(c.id);
                }}
              >
                {hasChild ? (
                  <Icon
                    icon={isOpen ? "mdi:folder-open" : "mdi:folder"}
                    width="18"
                    className="text-blue-600"
                  />
                ) : (
                  <Icon icon="mdi:paw" width="16" className="text-gray-500" />
                )}
                <span>{c.name}</span>
              </div>

              {hasChild && isOpen && renderTree(c.id, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <aside className="w-full md:w-64 border-r border-gray-300 pr-4">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-300">
        <Icon icon="mdi:paw" width="22" className="text-blue-700" />
        <h4 className="text-base font-semibold text-gray-800 uppercase tracking-wide">
          Danh mục sản phẩm
        </h4>
      </div>

      <ul className="flex flex-col divide-y divide-gray-200 mb-2">
        <li
          className={`flex items-center gap-2 px-2 py-2 text-sm cursor-pointer transition
            ${selected === null ? "bg-blue-100 text-blue-700" : "hover:text-blue-700 text-gray-800"}
          `}
          onClick={() => onSelect(null)}
        >
          <Icon icon="mdi:apps" width="18" />
          Tất cả sản phẩm
        </li>
      </ul>

      {renderTree(null)}
    </aside>
  );
}
