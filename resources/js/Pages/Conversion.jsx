import { Head } from "@inertiajs/react";
import CurrencyInput from "react-currency-input-field";
import Button from "@/Components/Button";
import { useForm } from "@inertiajs/react";

export default function Conversion(props) {
    const {
        flash: { success },
        conversions,
        availableCurrencies,
    } = props;

    const { data, setData, post, processing, errors } = useForm({
        amount: 0,
        base: "GBP",
        symbol: "EUR",
    });

    const formatCurr = (value, base = "GBP") => {
        const formatter = new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: base,
        });
        return formatter.format(+value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("conversion.store"));
    };

    return (
        <>
            <Head title="Welcome" />

            <div className="flex flex-col justify-center items-center min-h-screen p-10 bg-neutral-100">
                <div className="shadow-lg rounded-xl bg-white p-5 w-full max-w-2xl flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-medium mb-10 space-x-3">
                        <select
                            className="rounded-lg"
                            value={data.base}
                            onChange={(e) => setData("base", e.target.value)}
                        >
                            {availableCurrencies.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <span>to</span>
                        <select
                            className="rounded-lg"
                            value={data.symbol}
                            onChange={(e) => setData("symbol", e.target.value)}
                        >
                            {availableCurrencies.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </h1>

                    <form onSubmit={handleSubmit} className="flex items-center">
                        <CurrencyInput
                            placeholder={`Enter ${data.base} amount`}
                            className="mr-2 rounded-lg"
                            required
                            onValueChange={(value) => setData("amount", value)}
                        />
                        <Button type="submit" disabled={processing}>
                            Convert
                        </Button>
                    </form>

                    {success && (
                        <p className="text-lg my-10">
                            {`${formatCurr(success.amount)} ${
                                success.base
                            } = ${formatCurr(
                                success.converted,
                                success.symbol
                            )} ${success.symbol}`}
                        </p>
                    )}

                    {conversions.length > 0 ? (
                        <>
                            <h2 className="text-xl font-medium mt-16 mb-5">
                                Previous conversions
                            </h2>
                            <table className=" text-slate-400 text-md px-5 w-full">
                                <thead className="text-left">
                                    <tr>
                                        <th>Date</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>From Amount</th>
                                        <th>To Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {conversions.map((conversion) => (
                                        <tr key={conversion.id}>
                                            <td>{conversion.created_at}</td>
                                            <td>{conversion.base}</td>
                                            <td>{conversion.symbol}</td>
                                            <td>
                                                {formatCurr(
                                                    conversion.amount,
                                                    conversion.base
                                                )}
                                            </td>
                                            <td>
                                                {formatCurr(
                                                    conversion.converted,
                                                    conversion.symbol
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <p className=" text-gray-400 mt-16">
                            No Previous conversions
                        </p>
                    )}
                </div>
            </div>
        </>
    );
}
