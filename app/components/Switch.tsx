import { ToggleProps } from "../types/Common";

export default function Toggle({ id, label, checked, onChange }: ToggleProps) {
  return (
    <div className="absolute top-0 right-0 mt-2 mr-5">
      <input 
        type="checkbox" 
        id={id} 
        className="hidden"
        checked={checked}
        onChange={e => onChange(e.target.checked)} 
      />

      <label 
        htmlFor={id} 
        className="flex items-center cursor-pointer"
      >
        <div className="relative">
          <div 
            className={`block w-14 h-8 rounded-full ${checked ? 'bg-indigo-600' : 'bg-gray-600'}`} 
          />
          
          <div 
            className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${checked ? 'translate-x-full bg-gray-600' : ''}`}
          />
        </div>

        <div className="ml-3 text-gray-700 font-medium">
          {label}
        </div>
      </label>
    </div>
  );
}