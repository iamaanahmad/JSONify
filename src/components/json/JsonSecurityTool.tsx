"use client";

import { useState, useContext } from "react";
import { ShieldAlert, ShieldCheck, Wand2, Eye, EyeOff, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { JsonContext } from "./JsonTool";
import { secureJson } from "@/ai/flows/secure-json-flow";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

export function JsonSecurityTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState<{ redactedJson: string; redactedKeys: string[] } | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  
  const jsonContext = useContext(JsonContext);
  const { toast } = useToast();

  const handleScan = async () => {
    if (!jsonContext || jsonContext.validationStatus !== 'success' || !jsonContext.jsonString) {
        toast({
            variant: "destructive",
            title: "Invalid JSON",
            description: "Please provide valid JSON to scan for secrets.",
        });
      return;
    }
    
    setIsLoading(true);
    setScanResult(null);
    try {
      const result = await secureJson({ jsonString: jsonContext.jsonString });
      const formattedResult = {
        redactedJson: JSON.stringify(JSON.parse(result.redactedJsonString), null, 2),
        redactedKeys: result.redactedKeys,
      }
      setScanResult(formattedResult);

    } catch (error) {
      console.error("Failed to scan for secrets:", error);
      toast({
        variant: "destructive",
        title: "Scan Failed",
        description: "Could not scan for secrets. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyRedaction = () => {
    if (scanResult && jsonContext) {
        jsonContext.setJsonString(scanResult.redactedJson);
        toast({
            title: "Redaction Applied",
            description: "Sensitive data has been redacted from the JSON input.",
        });
        setScanResult(null);
    }
  };

  const renderScanResult = () => {
    if (!scanResult) return null;

    if (scanResult.redactedKeys.length === 0) {
        return (
            <Alert variant="default" className="border-green-500/50 text-green-500">
                <ShieldCheck className="h-4 w-4 !text-green-500" />
                <AlertTitle>No Secrets Found</AlertTitle>
                <AlertDescription>
                    The AI scanner did not find any obvious sensitive data in your JSON.
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <div className="space-y-4">
            <Alert variant="destructive">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>Potential Secrets Found!</AlertTitle>
                <AlertDescription>
                    The AI found {scanResult.redactedKeys.length} item(s) that might be sensitive.
                </AlertDescription>
            </Alert>

            <div className="flex flex-wrap gap-2">
                {scanResult.redactedKeys.map(key => (
                    <Badge key={key} variant="destructive">{key}</Badge>
                ))}
            </div>

            <div className="relative rounded-md bg-muted/30 border p-4 font-code text-sm">
                <pre><code>{showOriginal ? jsonContext?.jsonString : scanResult.redactedJson}</code></pre>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={() => setShowOriginal(!showOriginal)}>
                    {showOriginal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
            </div>

            <Button onClick={handleApplyRedaction}>
                <Check className="mr-2 h-4 w-4" />
                Apply Redaction
            </Button>
        </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Secure Mode</CardTitle>
        <CardDescription>Scan your JSON for sensitive data like passwords or API keys and redact them.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={handleScan} disabled={isLoading || jsonContext?.validationStatus !== 'success'}>
            <Wand2 className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            {isLoading ? "Scanning..." : "Scan with AI"}
        </Button>
        {isLoading && (
            <div className="space-y-2">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-8 w-1/4" />
            </div>
        )}

        {scanResult && !isLoading && renderScanResult()}
      </CardContent>
    </Card>
  );
}
