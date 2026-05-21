import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { Colors } from "../../utils/utils.colors";
import { uploadToCloudinary, CloudinaryFolder } from "../../utils/cloudinary";
import { toast } from "react-toastify";
import {
  FiBold,
  FiItalic,
  FiList,
  FiLink,
  FiImage,
  FiCode,
  FiAlignLeft,
} from "react-icons/fi";
import { LuHeading1, LuHeading2, LuHeading3, LuQuote, LuListOrdered, LuUndo, LuRedo } from "react-icons/lu";

const I = (C: any) => C as any;
const BoldI = I(FiBold);
const ItalicI = I(FiItalic);
const ListI = I(FiList);
const OrdListI = I(LuListOrdered);
const LinkI = I(FiLink);
const ImageI = I(FiImage);
const CodeI = I(FiCode);
const ParaI = I(FiAlignLeft);
const H1I = I(LuHeading1);
const H2I = I(LuHeading2);
const H3I = I(LuHeading3);
const QuoteI = I(LuQuote);
const UndoI = I(LuUndo);
const RedoI = I(LuRedo);

type Props = {
  value: string;
  onChange: (html: string) => void;
  folder?: CloudinaryFolder;
  placeholder?: string;
};

const ToolButton: React.FC<{ active?: boolean; onClick: () => void; title: string; children: React.ReactNode; testId?: string }> = ({ active, onClick, title, children, testId }) => (
  <button
    type="button"
    data-testid={testId}
    title={title}
    onClick={onClick}
    style={{
      background: active ? Colors.primaryColor : "transparent",
      color: active ? "white" : "#333",
      border: "none",
      padding: "6px 10px",
      borderRadius: 4,
      cursor: "pointer",
      fontSize: 14,
      display: "flex",
      alignItems: "center",
    }}
  >
    {children}
  </button>
);

export const RichEditor: React.FC<Props> = ({ value, onChange, folder = "ulpgl/articles", placeholder = "Rédigez votre contenu..." }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "rich-link" } }),
      Image,
      Placeholder.configure({ placeholder }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!editor) return <div style={{ padding: 20 }}>Chargement de l'éditeur...</div>;

  const insertLink = () => {
    const url = window.prompt("URL du lien :", editor.getAttributes("link").href || "");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const insertImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const url = await uploadToCloudinary(file, folder);
        editor.chain().focus().setImage({ src: url }).run();
        toast.success("Image insérée");
      } catch (e: any) {
        toast.error(e?.message || "Erreur d'upload");
      }
    };
    input.click();
  };

  return (
    <div data-testid="rich-editor" style={{ border: "1px solid #ddd", borderRadius: 8, overflow: "hidden", background: "white" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, padding: 8, borderBottom: "1px solid #eee", background: "#f9fafb" }}>
        <ToolButton testId="ed-h1" title="Titre 1" active={editor.isActive("heading", { level: 1 })} onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
          <H1I size={16} />
        </ToolButton>
        <ToolButton testId="ed-h2" title="Titre 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          <H2I size={16} />
        </ToolButton>
        <ToolButton testId="ed-h3" title="Titre 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
          <H3I size={16} />
        </ToolButton>
        <ToolButton title="Paragraphe" active={editor.isActive("paragraph")} onClick={() => editor.chain().focus().setParagraph().run()}>
          <ParaI size={16} />
        </ToolButton>
        <div style={{ width: 1, background: "#ddd", margin: "0 4px" }} />
        <ToolButton testId="ed-bold" title="Gras" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <BoldI size={16} />
        </ToolButton>
        <ToolButton testId="ed-italic" title="Italique" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <ItalicI size={16} />
        </ToolButton>
        <ToolButton title="Code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}>
          <CodeI size={16} />
        </ToolButton>
        <div style={{ width: 1, background: "#ddd", margin: "0 4px" }} />
        <ToolButton title="Liste à puces" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <ListI size={16} />
        </ToolButton>
        <ToolButton title="Liste numérotée" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <OrdListI size={16} />
        </ToolButton>
        <ToolButton title="Citation" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <QuoteI size={16} />
        </ToolButton>
        <div style={{ width: 1, background: "#ddd", margin: "0 4px" }} />
        <ToolButton testId="ed-link" title="Lien" active={editor.isActive("link")} onClick={insertLink}>
          <LinkI size={16} />
        </ToolButton>
        <ToolButton testId="ed-image" title="Insérer une image" onClick={insertImage}>
          <ImageI size={16} />
        </ToolButton>
        <div style={{ width: 1, background: "#ddd", margin: "0 4px" }} />
        <ToolButton title="Annuler" onClick={() => editor.chain().focus().undo().run()}>
          <UndoI size={16} />
        </ToolButton>
        <ToolButton title="Rétablir" onClick={() => editor.chain().focus().redo().run()}>
          <RedoI size={16} />
        </ToolButton>
      </div>
      <div className="rich-editor-body" style={{ padding: 14, minHeight: 220, maxHeight: 480, overflowY: "auto" }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
