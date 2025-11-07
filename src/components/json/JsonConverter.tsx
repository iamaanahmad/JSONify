"use client";

import { useState, useContext, useEffect } from "react";
import { Copy, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { JsonContext } from "./JsonTool";
import { convertFormat, type ConvertFormatInput } from "@/ai/flows/convert-format-flow";

type Format = "yaml" | "xml" | "toml";

export function JsonConverter() {
  const [activeTab, setActiveTab] = useState<Format>("yaml");
  const [convertedCode, setConvertedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const jsonContext = useContext(JsonContext);
  const { toast } = useToast();

  const handleConversion = async (format: Format) => {
    if (!jsonContext || jsonContext.validationStatus !== 'success' || !jsonContext.jsonString) {
      setConvertedCode("");
      return;
    }
    
    setIsLoading(true);
    setConvertedCode("");
    try {
      const result = await convertFormat({
        jsonString: jsonContext.jsonString,
        targetFormat: format,
      });
      setConvertedCode(result.convertedString);
    } catch (error) {
      console.error(`Failed to convert to ${format}:`, error);
      setConvertedCode(`Error converting to ${format}. Please try again.`);
      toast({
        variant: "destructive",
        title: "Conversion Failed",
        description: `Could not convert JSON to ${format}.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleConversion(activeTab);
  }, [jsonContext?.jsonString, jsonContext?.validationStatus, activeTab]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(convertedCode);
    toast({
      title: "Copied to Clipboard",
      description: `${activeTab.toUpperCase()} code has been copied.`,
    });
  };

  const renderContent = () => {
    if (jsonContext?.validationStatus !== 'success') {
      return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Please provide valid JSON to see the conversion.</p>
          </div>
      );
    }

    if (isLoading) {
      return <Skeleton className="w-full h-full" />;
    }

    return (
      <Textarea
        readOnly
        value={convertedCode}
        className="w-full h-full font-code text-sm resize-none bg-muted/20"
        placeholder={`Converted ${activeTab.toUpperCase()} will appear here...`}
      />
    );
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
            <div>
                <CardTitle>Multi-Format Converter</CardTitle>
                <CardDescription>Convert JSON to other formats.</CardDescription>
            </div>
            <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleConversion(activeTab)} disabled={isLoading || jsonContext?.validationStatus !== 'success'}>
                    <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleCopyToClipboard} disabled={!convertedCode || isLoading}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as Format)}
          className="flex-grow flex flex-col"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="yaml">YAML</TabsTrigger>
            <TabsTrigger value="xml">XML</TabsTrigger>
            <TabsTrigger value="toml">TOML</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="flex-grow mt-4 h-[40vh]">
            {renderContent()}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
