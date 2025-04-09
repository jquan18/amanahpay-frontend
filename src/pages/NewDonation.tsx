
import React, { useState } from 'react';
import DonorLayout from '@/components/DonorLayout';
import DonationTypeCard from '@/components/DonationTypeCard';
import { activeProjects, DonationType } from '@/data/mockData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Check, Gift, Heart, LibraryBig, Wallet, ArrowRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const NewDonation: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [donationType, setDonationType] = useState<DonationType | null>(null);
  const [projectId, setProjectId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [currency, setCurrency] = useState<string>("USD");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [note, setNote] = useState<string>("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    
    // Final submission
    toast({
      title: "Donation Submitted",
      description: `Your ${donationType} donation of ${currency} ${amount} has been submitted.`,
    });
    
    // Redirect to dashboard
    navigate("/donor/dashboard");
  };
  
  return (
    <DonorLayout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Make a Donation</CardTitle>
            <CardDescription>
              Your contribution will be securely processed and tracked on the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {/* Step 1: Choose donation type */}
              {step === 1 && (
                <>
                  <h2 className="text-lg font-medium mb-4">Step 1: Choose Donation Type</h2>
                  <div className="space-y-4">
                    <DonationTypeCard
                      title="Zakat"
                      description="Obligatory charity that purifies wealth and helps those in need."
                      icon={<Wallet size={20} />}
                      selected={donationType === 'Zakat'}
                      onClick={() => setDonationType('Zakat')}
                    />
                    
                    <DonationTypeCard
                      title="Waqf"
                      description="Perpetual endowment that continues to benefit recipients over time."
                      icon={<LibraryBig size={20} />}
                      selected={donationType === 'Waqf'}
                      onClick={() => setDonationType('Waqf')}
                    />
                    
                    <DonationTypeCard
                      title="Sadaqah"
                      description="Voluntary charity given out of compassion and generosity."
                      icon={<Heart size={20} />}
                      selected={donationType === 'Sadaqah'}
                      onClick={() => setDonationType('Sadaqah')}
                    />
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Button 
                      type="button" 
                      onClick={() => setStep(2)}
                      disabled={!donationType}
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
              
              {/* Step 2: Project Selection and Amount */}
              {step === 2 && (
                <>
                  <h2 className="text-lg font-medium mb-4">Step 2: Select Project and Amount</h2>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="project">Select Project</Label>
                      <Select value={projectId} onValueChange={setProjectId}>
                        <SelectTrigger id="project">
                          <SelectValue placeholder="Select a project" />
                        </SelectTrigger>
                        <SelectContent>
                          {activeProjects.map(project => (
                            <SelectItem key={project.id} value={project.id}>
                              {project.name}
                            </SelectItem>
                          ))}
                          <Separator />
                          <SelectItem value="general">General Fund</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Donation Amount</Label>
                        <Input
                          id="amount"
                          type="number"
                          placeholder="Enter amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="currency">Currency</Label>
                        <Select value={currency} onValueChange={setCurrency}>
                          <SelectTrigger id="currency">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="note">Message (Optional)</Label>
                      <Textarea
                        id="note"
                        placeholder="Add a personal note to your donation"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => setStep(3)}
                      disabled={!projectId || !amount || Number(amount) <= 0}
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
              
              {/* Step 3: Payment */}
              {step === 3 && (
                <>
                  <h2 className="text-lg font-medium mb-4">Step 3: Payment Method</h2>
                  
                  <div className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4">
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit" className="flex items-center cursor-pointer">
                          <div className="ml-2">
                            <h3 className="font-medium">Credit/Debit Card</h3>
                            <p className="text-sm text-gray-500">Secure payment via Stripe</p>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="crypto" id="crypto" />
                        <Label htmlFor="crypto" className="flex items-center cursor-pointer">
                          <div className="ml-2">
                            <h3 className="font-medium">Cryptocurrency</h3>
                            <p className="text-sm text-gray-500">Pay with ETH, BTC or other cryptocurrencies</p>
                          </div>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex items-center cursor-pointer">
                          <div className="ml-2">
                            <h3 className="font-medium">PayPal</h3>
                            <p className="text-sm text-gray-500">Fast checkout with PayPal</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                    
                    <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/30">
                      <h3 className="font-medium flex items-center mb-2">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        Blockchain Verification
                      </h3>
                      <p className="text-sm text-gray-600">
                        Your donation will be recorded on the blockchain, creating a permanent and 
                        transparent record of your contribution. You'll receive a unique transaction hash 
                        and digital certificate.
                      </p>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Donation Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <span className="font-medium">{donationType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Amount:</span>
                          <span className="font-medium">{currency} {amount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Project:</span>
                          <span className="font-medium">
                            {projectId === "general" 
                              ? "General Fund" 
                              : activeProjects.find(p => p.id === projectId)?.name || "-"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setStep(2)}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit"
                      disabled={!paymentMethod}
                    >
                      <Gift className="mr-2 h-4 w-4" />
                      Complete Donation
                    </Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </DonorLayout>
  );
};

export default NewDonation;
