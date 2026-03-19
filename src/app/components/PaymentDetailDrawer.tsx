import { Copy, RotateCcw } from "lucide-react";
import {
  RightDrawer,
  DrawerHeader,
  DrawerBody,
  DrawerHero,
  DrawerSectionHeader,
  DrawerRow,
  DrawerActionRow,
  DrawerCard,
  DrawerCardRow,
} from "./RightDrawer";

interface PaymentTransaction {
  id: number;
  time: string;
  customerName: string;
  paymentOption: string;
  transactionId: string;
  collectionMode: string;
  amount: number;
  status: string;
}

interface PaymentDetailDrawerProps {
  open: boolean;
  onClose: () => void;
  transaction: PaymentTransaction | null;
}

export function PaymentDetailDrawer({
  open,
  onClose,
  transaction,
}: PaymentDetailDrawerProps) {
  if (!transaction) return null;

  const formattedAmount = `₹${transaction.amount.toLocaleString("en-IN")}.00`;
  const statusVariant =
    transaction.status === "success"
      ? "success"
      : transaction.status === "pending"
        ? "pending"
        : transaction.status === "failed"
          ? "failed"
          : ("submitted" as const);

  const billAmount = transaction.amount;
  const merchantSubvention = Math.round(billAmount * 0.005);
  const paymentCharges = Math.round(billAmount * 0.005);
  const settlementAmount = billAmount - merchantSubvention - paymentCharges;

  return (
    <RightDrawer open={open} onClose={onClose}>
      <DrawerHeader
        onClose={onClose}
        actions={
          <a href="#" className="text-[14px] text-[#00b8f5] font-semibold hover:underline">
            Need Help?
          </a>
        }
      />

      <DrawerBody>
        <DrawerHero
          title={`Payment Received from\n${transaction.customerName}`}
          amount={formattedAmount}
          subtitle={`20 Mar 2018, ${transaction.time}`}
          status={statusVariant}
        />

        {/* FROM section */}
        <div className="px-6 py-3 flex flex-col gap-0.5">
          <span className="text-[12px] text-[#7e7e7e] uppercase tracking-[0.6px] font-semibold">From</span>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[14px] font-semibold text-[#101010]">
                {transaction.paymentOption} {transaction.transactionId}
              </span>
              <span className="text-[12px] text-[#7e7e7e]">HDFC Bank</span>
            </div>
          </div>
        </div>

        {/* Initiate Refund */}
        <DrawerActionRow
          icon={<RotateCcw className="size-4" />}
          label="Initiate Refund"
        />

        {/* Customer Details */}
        <DrawerSectionHeader>Customer Details</DrawerSectionHeader>
        <DrawerRow label="Name" value={transaction.customerName} />
        <DrawerRow label="Mobile Number" value="99****8100" />
        <DrawerRow label="Email ID" value="abc******@gmail.com" />
        <DrawerRow
          label="Customer ID"
          value={
            <span className="flex items-center gap-1.5 justify-end">
              <CopyButton text="416278990" />
              416278990
            </span>
          }
        />

        {/* Payment Details */}
        <DrawerSectionHeader>Payment Details</DrawerSectionHeader>
        <DrawerRow
          label="Payment Source"
          value={`${transaction.paymentOption} ${transaction.transactionId}`}
        />
        <DrawerRow
          label="Order ID"
          value={
            <span className="flex items-center gap-1.5 justify-end">
              <CopyButton text="******123456" />
              ******123456
            </span>
          }
        />
        <DrawerRow
          label="Transaction ID"
          value={
            <span className="flex items-center gap-1.5 justify-end">
              <CopyButton text="******278990" />
              ******278990
            </span>
          }
        />

        {/* Amount Details Card */}
        <DrawerCard title="Amount Details">
          <DrawerCardRow label="Bill Amount" value={`₹${billAmount.toLocaleString("en-IN")}`} bold />
          <DrawerCardRow label="Merchant Subvention (Including GST)" value={`- ₹${merchantSubvention}`} indent />
          <DrawerCardRow label="Payment Charges (Including GST)" value={`- ₹${paymentCharges}`} indent />
          <DrawerCardRow
            label="Settlement Amount"
            value={`₹${settlementAmount.toLocaleString("en-IN")}`}
            bold
            separator
          />
        </DrawerCard>
      </DrawerBody>
    </RightDrawer>
  );
}

function CopyButton({ text }: { text: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
  };

  return (
    <button
      onClick={handleCopy}
      className="text-[#00b8f5] hover:text-[#004299] transition-colors shrink-0"
    >
      <Copy className="size-3.5" />
    </button>
  );
}
