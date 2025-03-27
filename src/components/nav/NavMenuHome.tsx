import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/outline';

export default function NavMenuHome() {
    return (
        <Popover className="relative">
            {({ close }) => (
                <>
                    <Popover.Button className="inline-flex items-center p-2 rounded-lg hover:text-gray-900 transition-colors duration-200">
                        <Bars3Icon className="w-6 h-6" />
                    </Popover.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-2"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-2"
                    >
                        <Popover.Panel className="absolute right-0 z-10 mt-3 w-56 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-2">
                                <Link
                                    to="/explora"
                                    className="block px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors duration-200"
                                    onClick={() => close()}
                                >
                                    Explora
                                </Link>
                                <Link
                                    to="/login"
                                    className="block px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-colors duration-200"
                                    onClick={() => close()}
                                >
                                    Login
                                </Link>
                               
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}