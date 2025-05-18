import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface TagsInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
}

export const TagsInput = ({ tags, onTagsChange, placeholder }: TagsInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const { moodTheme } = useTheme();

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        onTagsChange([...tags, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className={`border rounded-md p-2 min-h-[42px] flex flex-wrap gap-2 ${moodTheme?.secondary || ''}`}>
      {tags.map(tag => (
        <div
          key={tag}
          className={`flex items-center px-2 py-1 rounded-full text-sm transition-all ${
            moodTheme?.primary
              ? `${moodTheme.primary} ${moodTheme.text || 'text-white'}`
              : 'bg-muted text-foreground'
          }`}
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className={`ml-2 ${moodTheme?.text || 'text-muted-foreground'} hover:text-foreground`}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || 'Add tags...'}
        className="flex-1 min-w-[100px] bg-transparent outline-none text-sm"
      />
    </div>
  );
};