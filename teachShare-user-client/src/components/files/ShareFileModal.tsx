import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { shareFile,downloadFile } from "../../slices/MaterialSlice";
import { fetchCategories } from "../../slices/CategoriesSlice";
import type { Material } from "../../Models/Collection";
import type { AppDispatch, RootState } from "../../store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { Share2, Loader2, CheckCircle } from "lucide-react";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import axios from "axios";

interface ShareFileModalProps {
  file: Material;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ALLOWED_EXTENSIONS = ["txt", "pdf", "docx"];

const ShareFileModal: React.FC<ShareFileModalProps> = ({
  file,
  open,
  onOpenChange
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector((state: RootState) => state.categories.categories);

  const [isPublic, setIsPublic] = useState<boolean>(file.isPublic || false);
  const [initialIsPublic, setInitialIsPublic] = useState<boolean>(file.isPublic || false);
  const [initialCategoryId, setInitialCategoryId] = useState<string>(file.categoryId?.toString() || "");
  const [categoryId, setCategoryId] = useState<string>(file.categoryId?.toString() || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [actionMessage, setActionMessage] = useState<string>("");

  // סיווג אוטומטי - קטגוריה מוצעת
  const [suggestedCategoryName, setSuggestedCategoryName] = useState<string>("");
  const [isCategoryConfirmed, setIsCategoryConfirmed] = useState<boolean>(false);

  useEffect(() => {
    if (open) {
      const fileIsPublic = file.isPublic || false;
      const fileCategoryId = file.categoryId?.toString() || "";

      setIsPublic(fileIsPublic);
      setInitialIsPublic(fileIsPublic);
      setCategoryId(fileCategoryId);
      setInitialCategoryId(fileCategoryId);
      setIsSuccess(false);
      setActionMessage("");
      setSuggestedCategoryName("");
      setIsCategoryConfirmed(false);

      // אם סיומת הקובץ היא txt/pdf/docx אז מבקשים presigned-url ואז מבצעים סיווג
      const ext = file.name.split(".").pop()?.toLowerCase() || "";
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        classifyFile();
      }
    }
  }, [open, file]);

  const classifyFile = async () => {
    setIsLoading(true);
    try {
      // בקשה לקבלת presigned url מהשרת דוטנט
      const response = await dispatch(downloadFile(file.s3Key)).unwrap()
      

      // קריאה לשרת פייתון עם presignedUrl לסיווג הקובץ
      const classifyRes = await axios.post("http://localhost:5000/classify-file", 
    { presigned_url: response },
    {
        headers: {
            'Content-Type': 'application/json'
        }
    }
);
   
      console.log("classifyRes", classifyRes);

      if (classifyRes.data && classifyRes.data.category) {
        setSuggestedCategoryName(classifyRes.data.category);
        setCategoryId(""); // נא לא לבחור קטגוריה אוטומטית עדיין
      } else {
        setSuggestedCategoryName("");
      }
    } catch (error) {
      console.error("שגיאה בסיווג הקובץ:", error);
      setSuggestedCategoryName("");
    } finally {
      setIsLoading(false);
    }
  };

  // טוען קטגוריות אם הן עדיין לא טעונות
  useEffect(() => {
    if (open && categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [open, categories.length, dispatch]);

  // מחפש ID לפי השם של הקטגוריה שהמשתמש אישר או בחר
  useEffect(() => {
    if (suggestedCategoryName && !categoryId && categories.length > 0) {
      const matched = categories.find(c => c.name === suggestedCategoryName);
      if (matched) {
        setCategoryId(matched.id.toString());
      }
    }
  }, [suggestedCategoryName, categories, categoryId]);

  const hasChanges = useMemo(() => {
    if (isPublic !== initialIsPublic) return true;
    if (isPublic && categoryId !== initialCategoryId) return true;
    return false;
  }, [isPublic, initialIsPublic, categoryId, initialCategoryId]);

  const isFormValid = useMemo(() => {
    if (!hasChanges) return false;
    if (isPublic && !categoryId) return false;
    return true;
  }, [isPublic, categoryId, hasChanges]);

  const handleConfirmCategory = () => {
    setIsCategoryConfirmed(true);
  };

  const handleShareFile = async () => {
    if (!hasChanges || (suggestedCategoryName && !isCategoryConfirmed)) return;

    setIsLoading(true);
    setIsSuccess(false);

    try {
      await dispatch(
        shareFile({
          fileId: file.id,
          isPublic,
          categoryId: categoryId ? parseInt(categoryId) : undefined,
        })
      ).unwrap();

      let message = "";
      if (isPublic && !initialIsPublic) {
        message = "הקובץ שותף בהצלחה!";
      } else if (!isPublic && initialIsPublic) {
        message = "השיתוף הוסר בהצלחה!";
      } else if (isPublic && initialIsPublic && categoryId !== initialCategoryId) {
        message = "קטגוריית השיתוף עודכנה בהצלחה!";
      }

      setActionMessage(message);
      setIsSuccess(true);
      setTimeout(() => onOpenChange(false), 1500);
    } catch (error) {
      console.error("שגיאה בשיתוף הקובץ:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const currentCategoryName = categories.find(c => c.id === parseInt(categoryId))?.name;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] rtl" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-right flex items-center gap-2">
            <Share2 className="h-5 w-5 text-blue-500" />
            שיתוף קובץ
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="bg-gray-50 p-3 rounded-md">
            <p className="text-sm text-gray-500">שם הקובץ:</p>
            <p className="font-medium">{file.name}</p>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="public-switch" className="font-medium">
              קובץ ציבורי
            </Label>
            <Switch
              id="public-switch"
              checked={isPublic}
              onCheckedChange={setIsPublic}
              disabled={isLoading}
            />
          </div>

          {isPublic && (
            <div className="space-y-2">
              {suggestedCategoryName && !isCategoryConfirmed && (
                <div className="bg-yellow-50 p-3 rounded-md border border-yellow-300">
                  <p>קטגוריה מוצעת: <b>{suggestedCategoryName}</b></p>
                  <Button onClick={handleConfirmCategory} disabled={isLoading}>
                    אשר קטגוריה מוצעת
                  </Button>
                </div>
              )}

              <Label htmlFor="category-select" className="block font-medium">
                בחירת קטגוריה <span className="text-red-500">*</span>
              </Label>
              <Select
                value={categoryId}
                onValueChange={(val) => {
                  setCategoryId(val);
                  setIsCategoryConfirmed(true);
                }}
                disabled={isLoading}
              >
                <SelectTrigger
                  id="category-select"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white text-black"
                >
                  <SelectValue
                    placeholder={currentCategoryName || "בחר/י קטגוריה"}
                  />
                </SelectTrigger>
                <SelectContent className="bg-white border rounded-md shadow-md">
                  {categories.map((category) => (
                    <SelectItem
                      key={category.id}
                      value={category.id.toString()}
                      className="text-black hover:bg-blue-100 hover:text-blue-900 px-2 py-1 cursor-pointer"
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {isSuccess && (
            <div className="bg-green-50 text-green-700 p-3 rounded-md flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="h-5 w-5 flex-shrink-0" />
              <span>{actionMessage}</span>
            </div>
          )}
        </div>

        <DialogFooter className="flex flex-row-reverse sm:justify-start gap-2">
          <Button
            onClick={handleShareFile}
            disabled={
              isLoading ||
              isSuccess ||
              !isFormValid ||
              (suggestedCategoryName !== "" && !isCategoryConfirmed)
            }
            className={`${isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-300 cursor-not-allowed"
              }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                מעדכן...
              </>
            ) : (
              "שמירה"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            ביטול
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareFileModal;
